import Cookies from 'js-cookie';
const accessToken = 'blog_access_token';
const refreshToken = 'blog_refresh_token';

export const objCookies = {
    expires: 30,
    domain: process.env.COOKIE_DOMAIN,
};

export const saveToken = (access_token, refresh_token) => {
    if (access_token && refresh_token) {
        Cookies.set(accessToken, access_token, objCookies);
        Cookies.set(refreshToken, refresh_token, objCookies);
    } else {
        Cookies.remove(accessToken, objCookies, { path: '' });
        Cookies.remove(refreshToken, objCookies, { path: '' });
    }
};

export const getToken = () => {
    return {
        access_token: Cookies.get(accessToken),
        refresh_token: Cookies.get(refreshToken),
    };
};

export const logOut = () => {
    const access_token = Cookies.get(accessToken);
    if (access_token) {
        Cookies.remove(accessToken, {
            ...objCookies,
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
        });
        Cookies.remove(refreshToken, {
            ...objCookies,
            path: '/',
            domain: process.env.COOKIE_DOMAIN,
        });
    }
};
