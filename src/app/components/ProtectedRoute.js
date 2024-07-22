"use client"

import React from 'react';
import { useApi } from '../context/ApiContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const { token } = useApi();
    const router = useRouter();

    React.useEffect(() => {
        if (token === undefined) {
            return;
        }

        if (token === null) {
            router.push('/login');
        }
    }, [token]);

    if (!token) {
        return null;
    }

    return children;
};

export default ProtectedRoute;