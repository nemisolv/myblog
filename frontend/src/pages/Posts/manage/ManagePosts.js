import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '~/components/Table';
import { IconAdjust, IconDelete, IconEye } from '~/components/icons';

import { axiosPrivate } from '~/config/axiosConfig';
import dateConverter from '~/utils/convertDate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import SpinLoader from '~/components/Loader';

const itemsPerPage = 3;

function ManagePosts() {
    const [nextPage, setNextPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosPrivate.get(`posts/manage/all?pageSize=${itemsPerPage}&pageNo=${nextPage}`);
                setLoading(false);
                console.log('🚀 ~ fetchData ~ response:', response);
                setPosts(response.data);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };

        fetchData();
    }, [nextPage]);

    const handleDeletePost = async (id) => {
        try {
            await axiosPrivate.patch('posts/' + id + '/trashed/' + true);
            window.location.reload();
            // setPosts(posts.data.map((post) => {
            //     if(post.id !== id) return post;
            //     return null;
            // }));
            toast.success('Post deleted successfully');
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

    const pageCount = posts.total_page;

    const handlePageClick = (event) => {
        setNextPage(event.selected + 1);
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
                            {posts?.data?.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>
                                        <div className="flex items-center gap-x-3">
                                            <img
                                                src={post.thumbnail}
                                                alt=""
                                                className="w-[66px] h-[55px] rounded object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{post.title}</h3>
                                                <time className="text-sm text-gray-500">
                                                    {dateConverter(post.created_at)}
                                                </time>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-primary text-gray-100 ">
                                            {post.tag.name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">
                                            {post.user.first_name + ' ' + post.user.last_name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">{post.status}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                           {post.status==='APPROVED' &&  <Link
                                                to={`/posts/${post.slug}`}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconEye />
                                            </Link>}
                                            <Link
                                                to={`/manage/update-post/${post.id}`}
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
                        </tbody>
                    </Table>
                </div>
            )}

            {loading && <SpinLoader />}
            {posts.total_page > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination mt-10"
                />
            )}
        </div>
    );
}

export default ManagePosts;
