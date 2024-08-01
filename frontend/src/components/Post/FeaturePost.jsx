import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import PostItem from '../NewestPost/PostItem';
import { publicRequest } from '@/config/axiosConfig';
import { NoResultText } from '../shared/NoResultText';

function FeaturePost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const res = await publicRequest.get('posts');
            setPosts(res.data);
        }
        getPosts();
    }, []);

    return (
        <div className="mt-[160px]">
            <h3 className=" relative text-primary text-xl font-medium border-t-heading">See all</h3>

            <div className="feature-post-list mt-6">
                {posts && posts?.length > 0 ? (
                    <Swiper grabCursor={true} spaceBetween={60} slidesPerView={'auto'}>
                        {posts.map((post) => (
                            <SwiperSlide key={post.id}>
                                <PostItem post={post} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <NoResultText text="No post yet" />
                )}
            </div>
        </div>
    );
}

export default FeaturePost;
