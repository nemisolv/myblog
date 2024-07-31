import { useEffect, useState } from 'react';
import Table from '~/components/Table';
import { IconTag } from '~/components/icons';
import IconDocument from '~/components/icons/IconDocument';
import IconGroupUser from '~/components/icons/IconGroupUser';
import { axiosPrivate } from '~/config/axiosConfig';
import dateConverter from '~/utils/convertDate';
import truncateString from '~/utils/truncateString';

function Dashboard() {
    const [dashboardOverview, setDashboardOverview] = useState({});
    const [recentPosts, setRecentPosts] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postCount = await axiosPrivate.get('/posts/count');
                setDashboardOverview({ postCount: postCount.data });
                const userCount = await axiosPrivate.get('/users/count');
                console.log('🚀 ~ fetchData ~ userCount:', userCount);
                setDashboardOverview((prev) => ({ ...prev, userCount: userCount.data }));
                const tagCount = await axiosPrivate.get('/tags/count');
                console.log('🚀 ~ fetchData ~ tagCount:', tagCount);
                setDashboardOverview((prev) => ({ ...prev, tagCount: tagCount.data }));
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRecentPosts = async () => {
            const res = await axiosPrivate.get('posts/recent');
            setRecentPosts(res.data);
        };

        fetchData();
        fetchRecentPosts();
    }, []);

    console.log(recentPosts);
    return (
        <div className="bg-slate-50 min-h-[100vh] h-full p-4">
            <div className="grid grid-cols-4 gap-5 ">
                <DashboardItem count={dashboardOverview.userCount} title="users">
                    <IconGroupUser />
                </DashboardItem>
                <DashboardItem count={dashboardOverview.postCount} title="posts" color="text-primary">
                    <IconDocument />
                </DashboardItem>
                <DashboardItem count={dashboardOverview.tagCount} title="tags" color="text-red-500">
                    <IconTag />
                </DashboardItem>
            </div>

            {/* recent articles */}
            <div className="bg-white mt-12">
                <h3 className="top-6 left-4 relative text-primary text-xl font-medium border-t-heading mb-8">
                    Recent posts
                </h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Post title</th>
                            <th>Post date</th>
                            <th>Tag</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {recentPosts &&
                            recentPosts.length > 0 &&
                            recentPosts.map((recentPost) => (
                                <tr>
                                    <th>{recentPost.id}</th>
                                    <th>
                                        <span className="font-normal">{truncateString(recentPost.title)}</span>
                                    </th>
                                    <th>
                                        <span className=" text-[13px] text-gray-500 font-normal">
                                            {dateConverter(recentPost.created_at)}
                                        </span>
                                    </th>
                                    <th>
                                        <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-primary text-gray-100 ">
                                            {recentPost.tag.name}
                                        </span>
                                    </th>
                                    <th>
                                        <span className="text-sm font-normal italic text-slate-500">
                                            {recentPost.numOfComments} comments
                                        </span>
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Dashboard;

function DashboardItem({ children, color, title, count }) {
    return (
        <div
            className="flex justify-evenly min-h-[120px] items-center bg-white rounded-xl shadow-sm"
            style={{
                boxShadow: 'rgba(50, 50, 93, 0.1) 0px 2px 5px -1px, rgba(0, 0, 0, 0.1) 0px 1px 3px -1px',
            }}
        >
            <span className={`rounded-lg ${color || 'text-green-300'}`}>{children}</span>
            <span>
                <h4 className="font-semibold text-2xl text-slate-600">{count}</h4>
                <span className="text-slate-400 text-sm ">{title}</span>
            </span>
        </div>
    );
}
