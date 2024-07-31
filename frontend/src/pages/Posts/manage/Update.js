import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Button from '~/components/Button';
import { Radio } from '~/components/Checkbox';
import { Dropdown } from '~/components/Dropdown';
import { Input } from '~/components/Form';
import Toggle from '~/components/Toggle';
import ImageUpload from '~/components/image/imageUpload';
import { axiosPrivate } from '~/config/axiosConfig';
import { postStatus } from '~/utils/constants';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import ImageUploader from 'quill-image-uploader';
import SpinLoader from '~/components/Loader';
Quill.register('modules/imageUploader', ImageUploader);

function UpdatePost() {
    const { id } = useParams();
    const [image, setImage] = useState('');
    const [post, setPost] = useState({});

    const [categories, setCategories] = useState([]);
    const [selectTag, setSelectTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const { control, handleSubmit, watch, setValue, reset } = useForm({
        mode: onchange,

        defaultValues: {
            title: '',
            slug: '',
            content: '',
            tag_id: '',
            status: postStatus.PENDING,
            hot: false,
        },
    });
    const watchStatus = watch('status');
    const watchHot = watch('hot');

    const onSubmit = async (data) => {
        data.slug = slugify(data.slug || data.title);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('slug', data.slug);
        formData.append('content', content);
        formData.append('status', data.status);
        formData.append('tagId', data.tag_id);
        formData.append('hot', data.hot);

        // Append image file if available
        if (image) {
            formData.append('image', image?.file);
        }

        try {
            setLoading(true);
            const res = await axiosPrivate.put(`posts/${post.id}`, formData);
            setLoading(false);
            if (res.status === 200) {
                toast.success('updated post successfully', { pauseOnHover: false });
            }
        } catch (error) {
            setLoading(false);
            if (error.response.status === 400) {
                toast.error(error.response.data?.message);
            }
            console.error('Error uploading post:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const post = await axiosPrivate.get(`posts/id/${id}`);
            reset(post.data);
            const categories = await axiosPrivate.get('tags');
            setCategories(categories.data);
            setPost(post.data);
            setImage({ src: post.data.thumbnail });
            setSelectTag(post.data?.tag || '');
            setContent(post.data?.content || '');
            setValue('tag_id', post.data?.tag.id);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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

    const handleClickOption = async (item) => {
        setValue('tag_id', item.id);
        setSelectTag(item);
    };

    const modules = useMemo(
        () => ({
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote'],
                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['link', 'image'],
            ],
            imageUploader: {
                // imgbbAPI
                upload: async (file) => {
                    const bodyFormData = new FormData();
                    bodyFormData.append('image', file);
                    const response = await axiosPrivate({
                        method: 'post',
                        url: process.env.REACT_APP_IMGBB_API_UPLOAD,
                        data: bodyFormData,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return response.data.data.url;
                },
            },
        }),
        [],
    );

    return (
        <div className="page-container mb-10">
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Update post</h1>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Input label="Title" name="title" control={control} placeholder="post's title" />
                    <Input
                        label="Slug"
                        name="slug"
                        control={control}
                        placeholder="Optional: Custom slug or auto-generate from title"
                    />
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <div>
                        <label htmlFor="">Status</label>
                        <div className="flex gap-x-4 mt-4">
                            <Radio
                                type="radio"
                                name="status"
                                control={control}
                                checked={watchStatus === postStatus.APPROVED}
                                value={postStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                type="radio"
                                name="status"
                                control={control}
                                checked={watchStatus === postStatus.PENDING}
                                value={postStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                type="radio"
                                name="status"
                                control={control}
                                checked={watchStatus === postStatus.REJECTED}
                                value={postStatus.REJECTED}
                            >
                                Rejected
                            </Radio>
                        </div>
                    </div>
                    <div>
                        <label className="mb-7 block">Hot</label>
                        <Toggle on={watchHot === true} onClick={() => setValue('hot', !watchHot)}></Toggle>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <div>
                        <label className="mb-7">Tag</label>
                        <Dropdown>
                            <Dropdown.Select value={selectTag?.name} placeholder="Select the tag"></Dropdown.Select>
                            <Dropdown.List>
                                {categories.length > 0 &&
                                    categories.map((item) => (
                                        <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>
                                            {item.name}
                                        </Dropdown.Option>
                                    ))}
                            </Dropdown.List>
                        </Dropdown>
                    </div>
                    <div>
                        <label className="">Thumbnail</label>
                        <ImageUpload
                            onChange={handleSelectImage}
                            handleDeleteImage={handleDeleteImage}
                            className="h-[250px] mt-5"
                            image={image.src}
                            name="image"
                        ></ImageUpload>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 entry-content mb-10">
                    <label className="">Content</label>

                    <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} />
                </div>
                {loading ? <SpinLoader /> : <Button primary>Save</Button>}
            </form>
        </div>
    );
}
export default UpdatePost;
