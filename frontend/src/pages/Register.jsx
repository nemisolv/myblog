import { useForm } from 'react-hook-form';
import { Input } from '@/components/Form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconArrowLeft from '@/components/icons/IconArrowLeft';
import { register } from '@/store/slices/authSlice';

const schema = Yup.object({
    firstName: Yup.string().required('first name cannot be empty'),
    lastName: Yup.string().required('lastname cannot be empty'),
    email: Yup.string().email('invalid email address').required("Email can't be empty"),
    password: Yup.string().required("Password can't be empty").min(6, 'Password must be at least 6 characters'),
});

function Register() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            });
        }
    }, [errors]);

    const onSubmit = async (data) => {
        try {
            dispatch(register(data));
        } catch (error) {
            console.error(error);
            toast.error('Failed to log in. Please try again.');
        }
    };

    return (
        <div className="page-container h-[100vh]  mx-auto mt-[200px]  ">
            <span onClick={() => navigate('/')} className=" top-0 cursor-pointer " title="Back to homepage">
                <IconArrowLeft />
            </span>
            <h2 className="text-center text-primary font-medium text-2xl">Sign up form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] mx-auto rounded-md p-3 w-full">
                <Input
                    type="text"
                    label="Firstname"
                    placeholder="Enter your firstname"
                    name="firstName"
                    control={control}
                />
                <Input
                    type="text"
                    label="Lastname"
                    placeholder="Enter your lastname"
                    name="lastName"
                    control={control}
                />
                <Input label="Email" placeholder="Enter your email" name="email" control={control} />
                <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    control={control}
                />

                <Button primary wFull loading={loading} disabled={loading}>
                    Sign up
                </Button>
                <p className="text-slate-500 text-sm mt-4 float-right">
                    Already has an account?{' '}
                    <Link to="/login" className="text-primary ">
                        Login now
                    </Link>
                </p>
            </form>
        </div>
    );
}
export default Register;
