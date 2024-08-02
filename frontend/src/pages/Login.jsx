import { useForm } from 'react-hook-form';
import { Input } from '@/components/Form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginSuccess } from '@/store/slices/authSlice';
import IconArrowLeft from '@/components/icons/IconArrowLeft';
import { saveToken } from '@/utils/auth';
import {  GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '@/constants';
import googleLogo from '@/assets/images/socials/google-logo.png';
import githubLogo from '@/assets/images/socials/github-logo.png';
import AuthService from '@/services/auth.service';
const schema = Yup.object({
    email: Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string().required("Password can't be blank").min(6, "Password must be at least 6 characters"),
});


function Login() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();
    const mfaEnabled = localStorage.getItem('mfaEnabled');

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message);
        }
    }, [errors]);

    const onSubmit = async (data) => {
        localStorage.setItem('email', data.email);
        data.navigate = navigate;
        try {
            dispatch(login(data));
        } catch (error) {
            toast.error('Failed to log in. Please try again.');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const res = await AuthService.verifyTFA({ code: verificationCode, email: localStorage.getItem('email') });
            const {token, refreshToken, userData} = res;
            saveToken(token, refreshToken);
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch(loginSuccess(userData));
            localStorage.removeItem('mfaEnabled');
            localStorage.removeItem('secretImageUri');
            localStorage.removeItem('email');
            navigate('/');
        } catch (error) {
            toast.error('Code is not correct');
            console.log('🚀 ~ handleVerifyCode ~ error:', error);
        }
    };

    return (
        <div className="page-container h-[100vh]  mx-auto mt-[150px]   ">
            <span onClick={() => navigate('/')} className=" top-0 cursor-pointer " title="Back to homepage">
                <IconArrowLeft />
            </span>
            {!mfaEnabled && (
                <div className='shadow max-w-[600px] mx-auto '>
                    <h2 className="text-center text-primary font-medium text-2xl ">Sign in form</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto rounded-md p-3 w-full">
                        <Input label="Email" placeholder="Enter your email" name="email" control={control} />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                            control={control}
                        />

                        <Button primary wFull loading={loading} disabled={loading}>
                            Sign in
                        </Button>
                        <p className="text-slate-500 text-sm my-3 float-right">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary ">
                                Register now
                            </Link>
                        </p>
                        <div className="w-full flex items-center justify-between mt-8">
                            <div className="border-t border-gray-200 w-full h-1"></div>
                            <div className="flex-none mx-4 text-gray-500 text-sm font-light">Or continue with</div>
                            <div className="border-t border-gray-200 w-full h-1"></div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <Link
                                to={GOOGLE_AUTH_URL}
                                className="flex gap-x-2 items-center p-3 shadow rounded-lg hover:shadow-md  cursor-pointer"
                            >
                                <div>
                                    <img src={googleLogo} alt="" className="w-4" />
                                </div>
                                <span className="text-xs text-slate-600">Continue with Google</span>
                            </Link>
                            <Link
                                to={GITHUB_AUTH_URL}
                                className="flex gap-x-2 items-center p-3 shadow rounded-lg hover:shadow-md  cursor-pointer"
                            >
                                <div>
                                    <img src={githubLogo} alt="" className="w-4" />
                                </div>
                                <span className="text-xs text-slate-600">Continue with Github</span>
                            </Link>
                        </div>
                    </form>
                </div>
            )}
            {mfaEnabled && (
                <div className="m-auto flex justify-between items-center  w-[700px]  my-20">
                    <img
                        src={localStorage.getItem('secretImageUri')}
                        alt=""
                        className="w-[300px] h-[300px] object-cover"
                    />
                    <div className="mt-10">
                        <h3 className="text-xl text-[#666666]">Two-factor authentication</h3>
                        <p className="text-[#696b6a] my-3 ">
                            Open your two-factor authenticator (TOTP) app or browser extension to view your
                            authentication code.
                        </p>
                        <div className="flex justify-between items-center gap-x-3 ">
                            <input
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                type="text"
                                placeholder="please enter your verification code"
                                className="w-full rounded block border-gray-300 placeholder:text-sm border py-2 px-4"
                                autoFocus
                            />
                            <button
                                onClick={handleVerifyCode}
                                type="button"
                                className="rounded w-[120px] py-2 block  text-white bg-blue-500 "
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Login;
