"use client"
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
import LoadingSpinner from '../components/LoadingSpinner';
import {useApi} from "../context/ApiContext";
import {useRouter} from "next/navigation";


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

    const fetchUser =  (uuid) => {
        api.getSession(uuid)
            .then(async (session) => {
                if (session.user_id) {
                    const user  = await api.loginUser(session.user_id);
                    setUser(user);
                } else {
                    setSecondLeft(prevState => {
                        return prevState - 1;
                    })
                }
            });
    };

    useEffect(() => {
        api.initiateQrAuthentication()
            .then(response => {
                setLink(response.url);
                setLoading(false);

                return response;
            })
            .then(response => {
                console.log(response);
                if (intervalId === -1) {
                    const id = setInterval(() => fetchUser(response.uuid), 1000);
                    setIntervalId(id);
                }
            });

        return () => {
            clearInterval(intervalId);
        };

    }, []);

    useEffect(()  => {
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
        <>
            {!failedToGetUser && (<>
                {loading ? <LoadingSpinner loading={loading}/> : <QRCode value={link} size={512}/>}
                {!user && !failedToGetUser &&
                    <div style={{marginTop: "20px"}}>Noch {secondLeft} Sekunden</div>}
            </>)}

            {failedToGetUser && (<>
                <div>Fehler: Benutzer konnte nicht abgerufen werden. Sie werden auf die Authentifizierungsseite weitergeleitet.</div>
            </>)}
        </>
    );
};

export default QrAuth;