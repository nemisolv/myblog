import React, {  useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { saveToken } from './auth';
import { toast } from 'react-toastify';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        const refreshToken = getUrlParameter('refreshToken');
        const error = getUrlParameter('error');

        if (token && refreshToken) {
            saveToken(token, refreshToken);
            navigate('/');
        } else if (error) {
            // navigate('/login');
            toast.error(error);
            // return <PageNotFound />;
        }
    }, []);

    // Mặc định không có gì để render
    return <div></div>;
};

export default OAuth2RedirectHandler;
