import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '@/components/Table';
import { IconAdjust, IconDelete, IconEye } from '@/components/icons';

import { privateRequest } from '@/config/axiosConfig';
import dateConverter from '@/utils/convertDate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoadingPage from '@/components/shared/LoadingPage';
import Pagination from '@/components/shared/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {  deletePost, getAllPostsForAdmin } from '@/store/slices/postSlice';


function ManagePosts() {
    const {posts, loading} = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPostsForAdmin());
    }, []);

    const handleDeletePost = async (id) => {
        try {
            await privateRequest.patch('posts/' + id + '/trashed/' + true);
            dispatch(deletePost(id));
        } catch (e) {
            console.log(e);
        }
    };

    const onDelete = (id) => {
        return confirmAlert({
            title: 'Confirm',
            message: "Are you sure you want to delete this post's id:" + id,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDeletePost(id),
                },
                {
                    label: 'No',
                },
            ],
        });
    };



    return (
        <div className="">
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Manage posts</h1>
            {!loading && (
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Post</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && posts?.data?.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>
                                        <div className="flex items-center gap-x-3">
                                            <img
                                                src={post?.thumbnail}
                                                alt=""
                                                className="w-[66px] h-[55px] rounded object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{post?.title}</h3>
                                                <time className="text-sm text-gray-500">
                                                    {dateConverter(post?.createdAt)}
                                                </time>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-primary text-gray-100 ">
                                            {post?.tag?.name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">
                                            {post?.user?.firstName + ' ' + post?.user?.lastName}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">{post.status}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            {post?.status === 'APPROVED' && (
                                                <Link
                                                    to={`/posts/${post.slug}`}
                                                    className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                                >
                                                    <IconEye />
                                                </Link>
                                            )}
                                            <Link
                                                to={`/admin/manage/update-post/${post.id}`}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconAdjust />
                                            </Link>

                                            <span
                                                onClick={() => onDelete(post.id)}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconDelete />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {loading && <LoadingPage />}
                        </tbody>
                    </Table>
                </div>
            )}

            {loading && <LoadingPage />}
            {posts.total_page > 1 && (
                <Pagination isNext={posts?.last} pageNumber={posts?.pageNo} />
            )}
        </div>
    );
}

export default ManagePosts;
