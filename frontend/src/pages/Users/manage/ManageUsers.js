import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '~/components/Table';
import { IconAdjust, IconDelete, IconEye } from '~/components/icons';

import { axiosPrivate } from '~/config/axiosConfig';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import SpinLoader from '~/components/Loader';
import IconCheck from '~/components/icons/IconCheck';

const itemsPerPage = 3;

function ManageUsers() {
    const [nextPage, setNextPage] = useState(1);
    const [users, setUsers] = useState([]);
    console.log('🚀 ~ ManageUsers ~ users:', users);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosPrivate.get(`users/manage/all?pageSize=${itemsPerPage}&pageNo=${nextPage}`);
            setLoading(false);
            setUsers(response.data);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    };
    useEffect(() => {
        fetchData();
    }, [nextPage]);

    const handleDeletePost = async (id) => {
        try {
            await axiosPrivate.patch(`users/${id}/trashed/true`);
            toast.success('User deleted successfully');
            fetchData();
            // console.log('user when deleted',users)
        } catch (e) {
            console.log(e);
        }
    };

    const onDelete = (id) => {
        return confirmAlert({
            title: 'Confirm',
            message: "Are you sure you want to delete this user's id:" + id,
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

    const pageCount = users.total_page;

    const handlePageClick = (event) => {
        setNextPage(event.selected + 1);
    };
    const handleUpdateUserStatus = async (user) => {
        try {
            const res = await axiosPrivate.patch(`users/${user.id}/status/${!user.enabled}`);
            if (res.status === 200) {
                toast.success('User status updated successfully');
                fetchData();
            }
        } catch (e) {
            toast.error('Error updating user status');
            console.log('🚀 ~ handleUpdateUserStatus ~ e:', e);
        }
    };

    return (
        <div className="">
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Manage users</h1>
            {!loading && (
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Avatar</th>
                                <th>Full name</th>
                                <th>Email</th>
                                <th>Enabled</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <img
                                            src={user.avatar || '/thumb-default.jpg'}
                                            alt=""
                                            className="w-[66px] h-[55px] rounded object-cover"
                                        />
                                    </td>
                                    <td>
                                        <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-primary text-gray-100 ">
                                            {user.first_name + ' ' + user.last_name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">{user.email}</span>
                                    </td>
                                    <td>
                                        <span
                                            onClick={() => handleUpdateUserStatus(user)}
                                            title={`click to ${user.enabled ? 'disable' : 'enable'} this user`}
                                        >
                                            <IconCheck color={!user.enabled ? 'text-gray-200' : 'text-green-500'} />
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">{user.address}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            <Link
                                                to={`/users/${user.id}/profile`}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconEye />
                                            </Link>
                                            {/* <Link
                                                to={`/manage/update-user/${user.id}`}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconAdjust />
                                            </Link> */}

                                            <span
                                                onClick={() => onDelete(user.id)}
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
            {users.total_page > 1 && (
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

export default ManageUsers;
