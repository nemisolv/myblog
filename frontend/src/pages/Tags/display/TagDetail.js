import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosPrivate from '~/config/axiosConfig';
import parse from 'html-react-parser';
import { formatDistanceToNow } from 'date-fns';

function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axiosPrivate.get(`posts/${slug}`);
                setPost(postResponse.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };

        fetchData();
    }, [slug]); // Make sure to include any dependencies that might trigger the effect to run again
    // console.log(formatDistanceToNow(new Date(post.created_at)));
    return (
        <div className="page-container max-w-[800px] mt-16">
            <div className=" gap-x-12">
                <div className="">
                    <span className="rounded-full text-white bg-gray-500 px-3 py-1 ">{post.tag.name}</span>

                    <h1 className="text-2xl my-4 font-semibold">{post.title}</h1>
                    <div className="flex gap-x-6">
                        <img
                            src={post.user.avatar || '/user-defeault.jpg'}
                            className="w-10 h-10 object-cover rounded-full"
                            alt="user's avatar"
                        />
                        <div className="mb-6">
                            <h2 className="text-gray-900 font-medium text-xl capitalize">{`${post.user.first_name} ${post.user.last_name}`}</h2>
                            {/* <p className="text-gray-600 text-xs">{dateConverter(post.created_at)}</p> */}
                            <p className="text-gray-600 text-xs">
                                {post?.created_at && formatDistanceToNow(post.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
                <img
                    src={post?.thumbnail || '/thumb-default.jpg'}
                    alt="thumbnail"
                    className=" w-full h-[400px] object-cover rounded-lg "
                />
            </div>
            <div className="post-content my-10">
                <div className="entry-content">{parse(`${post.content}`)}</div>
            </div>
        </div>
    );
}

export default PostDetail;
