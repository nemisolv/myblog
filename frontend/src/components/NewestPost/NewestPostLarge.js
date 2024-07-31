import { useEffect, useState } from 'react';
import { axiosPublic } from '~/config/axiosConfig';
import dateConverter from '~/utils/convertDate';
import { useNavigate } from 'react-router-dom';
function NewestPostLarge() {
    const navigate = useNavigate();

    const [post, setPost] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axiosPublic.get(`posts/latest`);
                setPost(postResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {post && (
                <div
                    onClick={() => navigate('/posts/' + post.slug)}
                    className="h-[350px] w-[640px] border-b-2 border-slate-600 shrink-0 shadow-md cursor-pointer"
                >
                    <div>
                        <img
                            src={post?.thumbnail || '/thumb-default.jpg'}
                            alt=""
                            className="rounded-xl w-full h-full object-cover block"
                        />
                    </div>
                    <div className="feature-item-content mt-6 border-b pb-2">
                        <span className="text-sm rounded-full text-lightGray bg-[#F3EDFF]  px-3 py-1 ">
                            {post?.tag?.name}
                        </span>
                        <h3 className=" text-sm leading-relaxed mt-2 ">{post.title}</h3>
                        <p className=" flex items-center gap-4 mt-3 text-sm text-lightGray ">
                            <span className="rounded-separate separate-gray relative">
                                {dateConverter(post.created_at)}
                            </span>
                            <span>{post?.user?.first_name + ' ' + post?.user?.last_name}</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewestPostLarge;
