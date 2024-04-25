import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../services/account.service';
import { Spin } from 'antd';

const ProtectedRoute = (props: { children: React.ReactElement }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const verifyUser = async () => {
        try {
            await getToken();
            setIsAuthenticated(true);
            setIsLoading(false);
        }
        catch(error)
        {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        verifyUser();
    }, []);

    const checkAuthen = () => {
        if(isLoading) {
            return <Spin />
        }
        if(isAuthenticated) return props.children;

        return <Navigate to='/login' replace />
    }

    return <>{checkAuthen()}</>
}

export default ProtectedRoute