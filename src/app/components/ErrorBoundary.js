import React, {useEffect, useState} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import styled from "styled-components";
import {useRouter} from "next/navigation";
import {logger} from "@/app/services/logger";

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
const FallbackComponent = ({ error, resetErrorBoundary }) => {
    const router = useRouter();
    const [backToMainPage, setBackToMainPage] = useState(false);

    useEffect(() => {
        if (backToMainPage) {
            const redirect = async () => {
                await router.push("/");
                resetErrorBoundary();
            };
            redirect();
        }
    }, [backToMainPage]);

    return (
        <ErrorContainer>
            <h1>Something went wrong:</h1>
            <p>{error.message}</p>
            <BtnBack onClick={() => setBackToMainPage(true)}>Zurück zur Hauptseite</BtnBack>
        </ErrorContainer>
    );
};

const TabletErrorBoundary = ({ children }) => (
    <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onError={(error, info) => {
            logger.error('Error caught by ErrorBoundary:', error);
            logger.error('Error info:', info);
        }}
    >
        {children}
    </ErrorBoundary>
);

export default TabletErrorBoundary;
