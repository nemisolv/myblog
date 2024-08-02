import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import { Input } from '@/components/Form';
import Textarea from '@/components/TextArea';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTag } from '@/store/slices/tagSlice';

const schema = Yup.object({
    name: Yup.string().required('Name cannot be empty').min(2, 'Name must be at least 2 characters'),
    description: Yup.string().required('Description cannot be empty'),
});

function AddTag() {
    const {loading} = useSelector(state => state.tag);
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: onchange,
        resolver: yupResolver(schema),

        defaultValues: {
            name: '',
            description: '',
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
        dispatch(addTag(data));
        reset();
        
    };

    return (
        <div className="page-container mb-10">
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Add new tag</h1>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Input label="Name" name="name" control={control} placeholder="tag's name" />

                <div className="flex flex-col gap-y-4 entry-content mb-10">
                    <label className="">Description</label>
                    <Textarea name="description" control={control} placeholder="something here..."></Textarea>
                </div>
                <Button primary loading={loading} disabled={loading}>Add</Button>
            </form>
        </div>
    );
}
export default AddTag;
