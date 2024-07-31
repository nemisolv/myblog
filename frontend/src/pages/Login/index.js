import { useForm } from 'react-hook-form';
import { Input } from '~/components/Form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '~/store/auth/authSlice';
import IconArrowLeft from '~/components/icons/IconArrowLeft';
import { saveToken } from '~/utils/auth';
import AuthService from '~/services/auth.service';
import { FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '~/constants';
import googleLogo from '~/assets/images/socials/google-logo.png';
import fbLogo from '~/assets/images/socials/fb-logo.png';
import githubLogo from '~/assets/images/socials/github-logo.png';
const schema = Yup.object({
    email: Yup.string().email('invalid email address').required("Email can't be empty"),
    password: Yup.string().required("Password can't be empty"),
});

function Login() {
    const verifyCodeRef = useRef();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [verificationCode, setVerificationCode] = useState('');
    // const [email,setEmail] = useState('')
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
        // check if current ref
        if (verifyCodeRef.current && verifyCodeRef.current.focus) {
            verifyCodeRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            });
        }
    }, [errors]);

    const onSubmit = async (data) => {
        localStorage.setItem('email', data.email);
        // setEmail(data.email);
        try {
            dispatch(authLogin(data));
        } catch (error) {
            toast.error('Failed to log in. Please try again.');
        }
    };

    const handleVerifyCode = async () => {
        try {
            const res = await AuthService.verifyTFA({ code: verificationCode, email: localStorage.getItem('email') });
            console.log('🚀 ~ handleVerifyCode ~ res:', res);
            saveToken(res.token, res.refreshToken);
            console.log('login thành công: ' + res);
            localStorage.removeItem('mfaEnabled');
            localStorage.removeItem('secretImageUri');
            localStorage.removeItem('email');
            window.location.href = '/';
        } catch (error) {
            toast.error('Code is not correct');
            console.log('🚀 ~ handleVerifyCode ~ error:', error);
        }
    };

    return (
        <div className="page-container h-[100vh]  mx-auto mt-[150px]  ">
            <span onClick={() => navigate('/')} className=" top-0 cursor-pointer " title="Back to homepage">
                <IconArrowLeft />
            </span>
            {!mfaEnabled && (
                <div>
                    <h2 className="text-center text-primary font-medium text-2xl">Sign in form</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto rounded-md p-3 w-full">
                        <Input label="Email" placeholder="Enter your email" name="email" control={control} />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                            control={control}
                        />

                        <Button primary wFull>
                            Sign in
                        </Button>
                        <p className="text-slate-500 text-sm my-3 float-right">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary ">
                                register now
                            </Link>
                        </p>
                        <div className="w-full flex items-center justify-between mt-8">
                            <div className="border-t border-gray-200 w-full h-1"></div>
                            <div className="flex-none mx-4 text-gray-500 text-sm font-light">Or continue with</div>
                            <div className="border-t border-gray-200 w-full h-1"></div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <a
                                href={GOOGLE_AUTH_URL}
                                className="flex gap-x-2 items-center p-3 shadow rounded-lg hover:shadow-md  cursor-pointer"
                            >
                                <div>
                                    <img src={googleLogo} alt="" className="w-4" />
                                </div>
                                <span className="text-xs text-slate-600">Continue with Google</span>
                            </a>
                            <a
                                href={FACEBOOK_AUTH_URL}
                                className="flex gap-x-2 items-center p-3 shadow rounded-lg hover:shadow-md  cursor-pointer"
                            >
                                <div>
                                    <img src={fbLogo} alt="" className="w-4" />
                                </div>
                                <span className="text-xs text-slate-600">Continue with Facebook</span>
                            </a>
                            {/* <a
                                href={GITHUB_AUTH_URL}
                                onClick={() => }
                                className="flex gap-x-2 items-center p-3 shadow rounded-lg hover:shadow-md  cursor-pointer"
                            >
                                <div>
                                    <img src={githubLogo} alt="" className="w-4" />
                                </div>
                                <span className="text-xs text-slate-600">Continue with Github</span>
                            </a> */}
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
                                ref={verifyCodeRef}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                type="text"
                                placeholder="please enter your verification code"
                                className="w-full rounded block border-gray-300 placeholder:text-sm border py-2 px-4"
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
