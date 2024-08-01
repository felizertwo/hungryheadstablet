"use client"

import {useApi} from '../context/ApiContext';
import {authenticate} from '../services/api/authenticate';
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {logger} from "@/app/services/logger";

const FormContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
`;

const Title = styled.h2`
    margin-bottom: 1rem;
    color: #333;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const StyledButton = styled.button`
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const ProgressBar = styled.div`
    margin-top: 1rem;
    height: 4px;
    background: #ccc;
    border-radius: 2px;
    overflow: hidden;

    & > div {
        height: 100%;
        width: ${props => props.progress}%;
        background: #007bff;
        transition: width 0.3s ease;
    }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

const RedirectingMessage = styled.div`
  padding: 0.75rem;
  color: #007bff;
  font-size: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.$ClmJusCon || "flex-start"};
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.$bgColor || "#f4f4f4"};
  font-family: "Coolvetica", Arial, sans-serif;
`;

const LoginPage = () => {
    const { loginTablet } = useApi();
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setTimeout(() => setProgress(25), 500);
        setTimeout(() =>  handleSubmit(), 1000);
    }, []);

    useEffect(() => {
        if (token) {
            setTimeout(() => loginTablet(token), 1000);
        }
    }, [token]);

    const tryAgainHandler = async (event) => {
        setError(null);
        setProgress(0);
        setLoading(true);
        setTimeout(() => setProgress(25), 500);
        setTimeout(() =>  handleSubmit(event), 1000);
    }

    const handleSubmit = async (event) => {
        event && event.preventDefault();
        setLoading(true);
        setProgress(50);

        try {

            await authenticate({
                email: process.env.NEXT_PUBLIC_POS_EMAIL,
                password: process.env.NEXT_PUBLIC_POS_PASSWORD,
                deviceName: "POS"
            }, setToken);
            setProgress(100);
        } catch (error) {
            logger.error(error);
            setError("Cannot to finish initialization. The reason is logged. Please try again.");
            setProgress(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormContainer>
                <Title>Initialization {loading ? "..." : error ? "failed" : "is success"}</Title>
                <StyledForm onSubmit={(e) => e.preventDefault()}>
                    {error && (
                        <>
                            <ErrorMessage>
                                {error} <br />
                            </ErrorMessage>
                            <StyledButton onClick={tryAgainHandler}>
                                Try again
                            </StyledButton>
                        </>
                    )}
                    {!loading && !error && (
                        <RedirectingMessage>
                            Initialized. Redirecting...
                        </RedirectingMessage>
                    )}

                </StyledForm>
                {loading && <ProgressBar progress={progress}><div /></ProgressBar>}
            </FormContainer>
        </Container>
    );
};

export default LoginPage;

