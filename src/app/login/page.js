"use client"

import {useApi} from '../context/ApiContext';
import {authenticate} from '../services/api/authenticate';
import React, {useState} from "react";
import styled from 'styled-components';

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

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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

//TODO: 1. Add resetting form failed attempt to login
const LoginPage = () => {
    console.log('login page');
    const {loginTablet} = useApi();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate({email, password, deviceName: "devicename"}, loginTablet)//FIXME: need to change devicename
            .catch(error => {
                //TODO: It is necessary to add comprehensive error handling
                alert(error.message);
            });
    };

    return (
        <FormContainer>
            <Title>Login Page</Title>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <StyledInput
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <StyledButton type="submit">Login</StyledButton>
            </StyledForm>
        </FormContainer>
    );
};

export default LoginPage;

