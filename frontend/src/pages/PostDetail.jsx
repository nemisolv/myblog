import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { formatDistanceToNow } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItem from '@/components/NewestPost/PostItem';
import Comment from '@/components/Comment';
import { publicRequest } from '@/config/axiosConfig';
import LoadingPage from '@/components/shared/LoadingPage';

function PostDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState({});
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await publicRequest.get(`posts/${slug}`);

                const rePosts = await publicRequest.get(
                    `posts/${postResponse.id}/related/${postResponse.tag.id}`,
                );
                setPost(postResponse);
                setRelatedPosts(rePosts);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);

                // Handle errors as needed
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]); // Make sure to include any dependencies that might trigger the effect to run again

    return (
        <>
            {!loading && (
                <>
                    <div className="page-container max-w-[800px] mt-16 ">
                        <div className=" gap-x-12">
                            <div className="">
                                <span className="rounded-full text-white bg-gray-500 px-3 py-1 ">
                                    {post?.tag?.name}
                                </span>
                                <h1 className="text-2xl my-4 font-semibold">{post?.title}</h1>
                                <div
                                    className="inline-flex gap-x-6 cursor-pointer"
                                    onClick={() => navigate(`/users/${post.user.id}/profile`)}
                                >
                                    <img
                                        src={post?.user?.avatar || '/user-default.jpg'}
                                        className="w-10 h-10 object-cover rounded-full shadow"
                                        alt="user's avatar"
                                    />
                                    <div className="mb-6">
                                        <h2 className="text-gray-900 font-medium text-xl capitalize">{`${post?.user?.firstName} ${post?.user?.lastName}`}</h2>
                                        <p className="text-gray-600 text-xs">
                                            {post?.createdAt && formatDistanceToNow(post.createdAt) + ' ago'}
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
                            <div className="entry-content">{parse(`${post?.content}`)}</div>
                        </div>
                    </div>

                    {relatedPosts.length > 0 && (
                        <div className="mt-[60px] mb-10">
                            <h3 className=" relative text-primary text-xl font-medium border-t-heading">
                                Related posts
                            </h3>

                            <div className="feature-post-list mt-6">
                                <Swiper grabCursor={true} spaceBetween={60} slidesPerView={'auto'}>
                                    {relatedPosts.map((post) => (
                                        <SwiperSlide key={post.id}>
                                            <PostItem post={post} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    )}

                    <Comment postId={post.id} />
                </>
            )}
            {loading && <LoadingPage />}
        </>
    );
}

export default PostDetail;
