import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Input } from '~/components/Form';
import Textarea from '~/components/TextArea';
import ImageUpload from '~/components/image/imageUpload';
import Button from '~/components/Button';
import { axiosPrivate } from '~/config/axiosConfig';
import { authRefreshToken, authUpdateUserInfo } from '~/store/auth/authSlice';
import { getToken, saveToken } from '~/utils/auth';

const schema = Yup.object({
    first_name: Yup.string()
        .required('first name cannot be empty')
        .max(10, 'first name must be less than 10 characters'),
    last_name: Yup.string().required('lastname cannot be empty').max(10, 'Lastname must be less than 10 characters'),
    description: Yup.string().max(255, 'The description must be less than 255 characters'),
});
function OwnerProfile() {
    const { user, role } = useSelector((state) => state.auth);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
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
        console.log('🚀 ~ onSubmit ~ data:', data);

        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('firstName', data.first_name);
        formData.append('lastName', data.last_name);
        formData.append('description', data.description);
        formData.append('password', !data.password ? '' : data.password);
        formData.append('address', data.address);
        // Append image file if available
        if (image) {
            formData.append('image', image?.file);
        }

        try {
            const res = await axiosPrivate.put(`users/me/update`, formData);

            if (res.status === 200) {
                dispatch(
                    authUpdateUserInfo({
                        user: res.data,
                        role: role,
                        isLoggedIn: true,
                    }),
                );
                const { refresh_token } = getToken();

                const newData = await  axiosPrivate.post('/auth/refresh-token',{},{
                    headers: { 'Authorization': 'Bearer ' + refresh_token}
                });
                console.log("🚀 ~ onSubmit ~ refreshToken:", newData.data)
                saveToken(newData.data.token, newData.data.refreshToken);

                toast.success('updated profile successfully', { pauseOnHover: false });
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data?.message);
            }
            console.error('Error uploading user:', error);
        }
    };
    const handleSelectImage = (e) => {
        var file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            toast.error('Please select a valid image.The format image should be PNG or JPEG.', { pauseOnHover: false });
            return;
        } else if (file.size > 1024 * 1024 * 2) {
            toast.error('The image size is too large! It should be less than 2MB.', { pauseOnHover: false });
            return;
        }
        setImage({ file });
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImage((prev) => ({ ...prev, src: e.target.result }));
        };
    };
    const handleDeleteImage = (e) => {
        e.preventDefault();
        setImage('');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await axiosPrivate.get('users/' + user.id);
                console.log('🚀 ~ fetchData ~ userData:', userData);
                userData.data.password = '';
                reset(userData.data);
                // setInfo(userData);
                setImage({ src: userData.data.avatar });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <div className="grid grid-cols-2 gap-x-6">
                                <Input
                                    type="text"
                                    label="First name"
                                    placeholder=" first name"
                                    name="first_name"
                                    control={control}
                                />
                                <Input
                                    type="text"
                                    label="Last name"
                                    placeholder=" last name"
                                    name="last_name"
                                    control={control}
                                />
                            </div>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                name="email"
                                control={control}
                                readOnly
                                title="can't change"
                            />
                            <Input
                                type="password"
                                label="Password"
                                placeholder="leave blank if you don't want to change your password"
                                name="password"
                                control={control}
                            />
                        </div>
                        <div className="flex flex-col gap-y-4 entry-content mb-10">
                            <label className="" htmlFor="address">
                                Address
                            </label>
                            <Textarea
                                id="address"
                                name="address"
                                control={control}
                                placeholder="something here..."
                            ></Textarea>
                        </div>

                        <div className="mb-10">
                            <label className="">Thumbnail</label>
                            <ImageUpload
                                onChange={handleSelectImage}
                                handleDeleteImage={handleDeleteImage}
                                className="h-[250px] mt-5"
                                image={image.src}
                                name="image"
                            ></ImageUpload>
                        </div>

                        <div className="flex flex-col gap-y-4 entry-content mb-10">
                            <label className="" htmlFor="address">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                control={control}
                                placeholder="A little bit about yourself..."
                            ></Textarea>
                        </div>
                        <Button primary wFull>
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default OwnerProfile;
