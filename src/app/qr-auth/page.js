"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApi } from "../context/ApiContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/images/logo.png";

const QrPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

const QrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 221px);
  margin-top: 221px;
  width: 100%;
`;

const LogoSmall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #ffffff;
  width: 100%;
  height: 200px;
  padding-bottom: 20px;
  border-bottom: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    padding: 60px;
  }
`;

const BtnBack = styled.div`
  width: 154px;
  height: 75px;
  border: 0;
  border-radius: 10px;
  background-color: #f2f2f2;
  color: #000000;
  font-weight: bold;
  font-size: 25px;
  margin: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none; /* Für das Container-Tag */
  a {
    text-decoration: none; /* Für das a-Tag innerhalb des Containers */
    color: #000000; /* Optional, um die Textfarbe vom Eltern-Container zu erben */
  }
`;

//TODO: WHAT NEED TO DO:
//TODO: 1. FIX DESIGN OF THIS PAGE
const QrAuth = () => {
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState(null);
  const [user, setUser] = useState(null);
  const [secondLeft, setSecondLeft] = useState(120);
  const [intervalId, setIntervalId] = useState(-1);
  const [failedToGetUser, setFailedToGetUser] = useState(false);

  const api = useApi();
  const router = useRouter();

  const fetchUser = (uuid) => {
    api.getSession(uuid).then(async (session) => {
      if (session.user_id) {
        const user = await api.loginUser(session.user_id);
        setUser(user);
      } else {
        setSecondLeft((prevState) => {
          return prevState - 1;
        });
      }
    });
  };

  useEffect(() => {
    api
      .initiateQrAuthentication()
      .then((response) => {
        setLink(response.url);
        setLoading(false);

        return response;
      })
      .then((response) => {
        if (intervalId === -1) {
          const id = setInterval(() => fetchUser(response.uuid), 1000);
          setIntervalId(id);
        }
      });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (user) {
      clearInterval(intervalId);
    } else if (secondLeft <= 0) {
      clearInterval(intervalId);
      setFailedToGetUser(true);
    }
  }, [user, secondLeft]);

  useEffect(() => {
    if (failedToGetUser) {
      setTimeout(() => router.push("/type"), 3000);
    }
  }, [failedToGetUser]);

  useEffect(() => {
    if (user) {
      router.push("/menu");
    }
  }, [user]);

  return (
    <QrPage>
      <LogoSmall>
        <Image src={Logo} width={260} height={122} alt="Logo" />
        <BtnBack onClick={() => router.push("/type")}>Zurück</BtnBack>
      </LogoSmall>
      <QrWrapper>
        {!failedToGetUser && (
          <>
            {loading ? (
              <LoadingSpinner loading={loading} />
            ) : (
              <QRCode value={link} size={512} />
            )}
            {!user && !failedToGetUser && (
              <div style={{ marginTop: "20px" }}>
                Noch {secondLeft} Sekunden
              </div>
            )}
          </>
        )}

        {failedToGetUser && (
          <>
            <div>
              Fehler: Benutzer konnte nicht abgerufen werden. Sie werden auf die
              Authentifizierungsseite weitergeleitet.
            </div>
          </>
        )}
      </QrWrapper>
    </QrPage>
  );
};

export default QrAuth;
