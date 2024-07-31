import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import PostItem from '../NewestPost/PostItem';
import { axiosPublic } from '~/config/axiosConfig';

function FeaturePost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const res = await axiosPublic.get('posts');
            setPosts(res.data.data);
        }
        getPosts();
    }, []);

    return (
        <div className="mt-[160px]">
            <h3 className=" relative text-primary text-xl font-medium border-t-heading">See all</h3>

            <div className="feature-post-list mt-6">
                <Swiper grabCursor={true} spaceBetween={60} slidesPerView={'auto'}>
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <PostItem post={post} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default FeaturePost;
