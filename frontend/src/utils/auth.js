import Cookies from 'js-cookie';
const accessToken = 'blog_access_token';
const refreshToken = 'blog_refresh_token';



export const saveToken = (access_token, refresh_token) => {
    if (access_token && refresh_token) {
        Cookies.set(accessToken, access_token);
        Cookies.set(refreshToken, refresh_token);
    } else {
        Cookies.remove(accessToken);
        Cookies.remove(refreshToken);
    }
};

export const getToken = () => {
    return {
        access_token: Cookies.get(accessToken),
        refresh_token: Cookies.get(refreshToken),
    };
};

export const logOut = (navigate) => {
    const access_token = Cookies.get(accessToken);
    if (access_token) {
        Cookies.remove(accessToken);
        Cookies.remove(refreshToken);
    }
    localStorage.removeItem('user');
    if(navigate) {
        navigate('/login');
    }else {
        window.location.href = '/login';
    }
};
