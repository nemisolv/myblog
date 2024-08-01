import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken, logOut, saveToken } from '@/utils/auth';

export const privateRequest = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // withCredentials: true,
    'Content-Type': 'application/json',
});

export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    'Content-Type': 'application/json',
});

privateRequest.interceptors.request.use(
    (config) => {
        const { access_token } = getToken();

        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

privateRequest.interceptors.response.use(
    async (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { refresh_token } = getToken();
                console.log('🚀 ~ refresh_token:', refresh_token);
                const response = await publicRequest.post('/auth/refresh-token', null, {
                    headers: {
                        Authorization: `Bearer ${refresh_token}`,
                    },
                });
                console.log('🚀 ~ response:', response);
                const { token } = response.data;
                saveToken(token, refresh_token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return privateRequest(originalRequest);
            } catch (err) {
                logOut();
                toast.error('Your session has expired,please login again!');
                window.location.reload();
                // console.log('refresh token cũng hết hạn rồi')
                // console.log(err);
            }
        }

        return Promise.reject(error);
    },
);

privateRequest.interceptors.response.use(
    (response) => response?.data,
    (error) => {
        if (error.response.status === 401) {
            logOut();
            toast.error('Your session has expired,please login again!');
            window.location.reload();
        }
        return Promise.reject(error);
    },
);

publicRequest.interceptors.response.use(
    res => res?.data,
    err => {
        return Promise.reject(err);
    },
)