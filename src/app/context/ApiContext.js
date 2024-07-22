"use client"

import React, { createContext, useState, useContext, useEffect } from 'react';
import {useRouter} from "next/navigation";
import {foodItems} from "../services/api/food-items";
import {errorHandler} from "../services/extension/errorHandler";
import {contentParser} from "../services/extension/contentParser";
import {createOrder} from "../services/api/create-order";
import {initiateQrAuthentication} from "../services/api/qr-authenticate";
import {getSession} from "../services/api/get-session";
import { sumupToken } from '../services/api/sumupToken';
import {getUser} from "../services/api/get-user";

const ApiContext = createContext();

const AUTH_TOKEN_STORAGE_KEY = 'auth.token';

export const ApiProvider = ({ children }) => {
    const [token, setToken] = useState(undefined);
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
        setToken(storedToken);
    }, []);

    const handleLoginTablet = (newToken) => {
        setToken(newToken);
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, newToken); // Persist token to local storage
        router.push("/");
    };

    const handleLogoutTablet = () => {
        console.log("handleLogoutTablet is called");
        setToken(null);
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY); // Remove token from local storage
        router.push("/login");
    };

    const authorizationErrorHandler = (error) =>  {
        if (error.httpStatus === 401) {
            handleLogoutTablet();
        }

        return Promise.reject(error);
    };

    async function fetchJsonWithErrorHandling(fetchFunction) {
        return fetchFunction()
            .then(errorHandler)
            .then(contentParser)
            .catch(authorizationErrorHandler);
    }

    async function fetchTextWithErrorHandling(fetchFunction) {
        return fetchFunction()
            .then(errorHandler)
            .then((response) => response.text())
            .catch(authorizationErrorHandler);
    }


    const foodItemsApi = () => fetchJsonWithErrorHandling(() => foodItems(token));
    const createOrderApi = (order) => fetchJsonWithErrorHandling(() => createOrder(token, order));
    const initiateQrAuthenticationApi = () => fetchJsonWithErrorHandling(() => initiateQrAuthentication(token));
    const getSessionApi = (userUuid) => fetchJsonWithErrorHandling(() => getSession(userUuid, token));
    const getSumUpToken = () => fetchTextWithErrorHandling(() => sumupToken(token));


    const loginUserApi =  (userId) => {
        return fetchJsonWithErrorHandling(() => getUser(userId, token))
            .then(fetchedUser => {
                setUser(fetchedUser);
                return fetchedUser;
            });
    };

    const value = {
        token,
        loginTablet: handleLoginTablet,
        logoutTablet: handleLogoutTablet,
        foodItems: foodItemsApi,
        createOrder: createOrderApi,
        initiateQrAuthentication: initiateQrAuthenticationApi,
        getSession: getSessionApi,
        getSumUpToken: getSumUpToken,
        loginUser: loginUserApi,
        getUser: () => user,
        isAuthenticated: () => !!user
    };


     return (
        <ApiContext.Provider value={value}>
            <>
                {children}
            </>
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
