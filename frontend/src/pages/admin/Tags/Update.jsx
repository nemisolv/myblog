import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import { Input } from '@/components/Form';
import { privateRequest } from '@/config/axiosConfig';
import { useParams } from 'react-router-dom';
import Textarea from '@/components/TextArea';

function UpdateTag() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, reset } = useForm({
        mode: onchange,

        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await privateRequest.put(`tags/${id}`, data);
            setLoading(false);
            if (res.status === 200) {
                toast.success('updated tag successfully', { pauseOnHover: false });
            }
        } catch (error) {
            setLoading(false);
            if (error.response.status === 400) {
                toast.error(error.response.data?.message);
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            const tag = await privateRequest.get(`tags/${id}`);
            reset(tag.data);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="page-container mb-10">
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Update tag</h1>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Input label="Name" name="name" control={control} placeholder="tag's name" />
                </div>

                <div className="flex flex-col gap-y-4">
                    <label htmlFor="">Description</label>
                    <Textarea name="description" control={control} placeholder="something..."></Textarea>
                </div>
                <Button primary loading={loading} disabled={loading}>Save</Button>
            </form> 
        </div>
    );
}
export default UpdateTag;
