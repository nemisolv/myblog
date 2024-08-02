import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserService from '@/services/user.service';
import { useDispatch } from 'react-redux';
import { saveToken } from '@/utils/auth';
import { loginSuccess } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';

export default function OAuth2Redirect() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const error = searchParams.get('error');
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(`${error}. Please try login with google`);
            navigate('/login');
            return;
        }
        if (token && refreshToken) {
            const handleLoginOauth2 = async () => {
                saveToken(token, refreshToken);
                const response = await UserService.getFullInfoOfCurrentUser();
                Cookies.set('user', JSON.stringify(response));
                dispatch(loginSuccess(response));
                navigate('/');
            };
            handleLoginOauth2();
        }
    }, []);

    return (
        <div className="flex-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light-500 dark:border-dark-500"></div>
        </div>
    );
}
