import { axiosPrivate, axiosPublic } from '~/config/axiosConfig';

export const authRequestRegister = (data) => {
    return axiosPublic.post('/auth/register', data);
};

export const authRequestLogin = (data) => {
    return axiosPublic.post('/auth/login', data);
};

export const authRequestRefreshToken = (token) => {
    if (!token) return;

    return axiosPublic.post(
        '/auth/refresh-token',
        {},
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        },
    );
};

// export const authRequestEnableTFA = (data) => {
//     return axiosPublic.post('auth/verify', data);
// };
