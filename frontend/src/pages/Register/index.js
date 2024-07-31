import { useForm } from 'react-hook-form';
import { Input } from '~/components/Form';
import * as Yup from 'yup';

import { yupResolver } from "@hookform/resolvers/yup"
import Button from '~/components/Button';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {  Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authRegister } from '~/store/auth/authSlice';
import IconArrowLeft from '~/components/icons/IconArrowLeft';

const schema = Yup.object(
    {
        first_name: Yup.string().required("first name cannot be empty")
                .max(10,"first name must be less than 10 characters"),
        last_name: Yup.string().required("lastname cannot be empty")
                .max(10,"Lastname must be less than 10 characters"),
        email: Yup.string().email("invalid email address")
                .required("Email can't be empty"),
        password: Yup.string().required("Password can't be empty"),
    }
)


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        }
    });
    useEffect(() => {
        const arrErrors = Object.values(errors);
        if(arrErrors.length >0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false
            },
           );
        }
    },[errors])

    const onSubmit = async (data) => {

        try {
            dispatch(authRegister(data));
           
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
                    name="first_name"
                    control={control}

                />
                <Input
                    type="text"
                    label="Lastname"
                    placeholder="Enter your lastname"
                    name="last_name"
                    control={control}

                />
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    control={control}

                />
                <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    control={control}

                />

                <Button primary wFull  >Sign up</Button>
                <p className='text-slate-500 text-sm mt-4 float-right'>Already has an account? <Link to="/login" className='text-primary '>Login now</Link></p>
            </form>
        </div>
    );
}
export default Register;
