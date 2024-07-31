import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import PostItem from "../NewestPost/PostItem";
import { useEffect, useState } from "react";
import { axiosPublic } from "~/config/axiosConfig";

function HotPost() {
    const [posts, setPosts] = useState([]);

useEffect(() => {
    async function getPosts() {
        const res = await axiosPublic.get('posts/hot');
        setPosts(res.data);
    }
    getPosts();
}, []);

    return (
        <div className="mt-[160px]">
            <h3 className=" relative text-primary text-xl font-medium border-t-heading">Hot</h3>

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
    )

}
export default HotPost;