import { useEffect, useState } from 'react';
import NewestPostItem from './NewestPostItem';
import NewestPostLarge from './NewestPostLarge';
import { axiosPublic } from '~/config/axiosConfig';

function NewestPost() {
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axiosPublic.get(`posts/recent`);
                setRecentPosts(postResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="newest-section mt-12">
            <h3 className=" relative text-primary text-xl font-medium border-t-heading">Newsest</h3>
            <div className="flex gap-10 mt-6">
                <NewestPostLarge />
                <div className="rounded-xl overflow-hidden flex-1 ">
                    {recentPosts.length > 0 &&
                        recentPosts
                            .slice(1, 5)
                            .map((recentPost) => <NewestPostItem key={recentPost.id} post={recentPost} />)}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-x-10 mt-10">
                {/* {recentPosts.length > 0 && recentPosts.map((recentPost) => <PostItem post={recentPost} />)} */}
            </div>
        </div>
    );
}

export default NewestPost;
