"use client";

import styled from "styled-components";
import Logo from "../../images/logo.png";
import Image from "next/image";
import QRIcon from "../../images/qrcodeicon.png";
import UserIcon from "../../images/usericon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  height: 100vh;
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

  @media (max-width: 800px) {
    img {
      padding-right: 0;
      padding-left: 30px;
    }
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

  @media (max-width: 800px) {
    margin-left: 20px;
    margin-right: 30px;
  }
`;

const IntroText = styled.h3`
  font-family: "Coolvetica";
  font-size: 60px;
  letter-spacing: 3px;
  color: #000000;
  font-weight: bold;
  margin: 0;
  padding: 0;
  padding-bottom: 65px;
  text-align: center;
`;

const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Chooser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100% - 221px);
  margin-top: 221px;
  gap: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const BtnType = styled.button`
  width: 300px;
  height: 200px;
  border-radius: 5px;
  border: 0;
  margin-bottom: 20px;
  cursor: pointer;
  background: white;
`;

const TypeChooserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;

  a {
    background: white;
    text-decoration: none;
    padding: 10px;
    padding-bottom: 20px;
  }

  h4 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    line-height: 20px;
    color: #000000;
    font-weight: bold;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

const TypePage = () => {
  const router = useRouter();
  return (
    <StartWrapper style={{ position: "relative" }}>
      <LogoSmall>
        <Image
          src={Logo}
          width={260}
          height={122}
          alt="Logo"
          style={{ objectFit: "contain" }}
        />
        <BtnBack onClick={() => router.push("/")}>Zurück</BtnBack>
      </LogoSmall>
      <TypeWrapper>
        {/* <IntroText>
          Herzlich willkommen <br /> im Hungry Heads
        </IntroText> */}
        <Chooser>
          <TypeChooserWrapper>
            <Link href="/qr-auth">
              <BtnType>
                <Image src={QRIcon} height={183} alt="qr code" />
              </BtnType>
              <h4>
                Hungry Heads <br />
                Mitglied
              </h4>
            </Link>
          </TypeChooserWrapper>
          <TypeChooserWrapper>
            <Link href="/menu" passHref>
              <BtnType>
                <Image src={UserIcon} height={151} alt="Private User" />
              </BtnType>
              <h4>
                Hungry Heads <br />
                Gast
              </h4>
            </Link>
          </TypeChooserWrapper>
        </Chooser>
      </TypeWrapper>
    </StartWrapper>
  );
};

export default TypePage;
