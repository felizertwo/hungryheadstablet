"use client"

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const ErrorContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnBack = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const ErrorPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/cart");
  };

  const handleClose = async () => {
      router.push("/");
  };

  return (
    <ErrorContainer>
      <h1>Payment Failed</h1>
      <p>There was an error processing your payment. Please try again.</p>
      <BtnBack onClick={handleBack}>Zurück zum Warenkorb</BtnBack>
      <BtnBack onClick={handleClose}>Zurück zur Hauptseite</BtnBack>
    </ErrorContainer>
  );
};

export default ErrorPage;
