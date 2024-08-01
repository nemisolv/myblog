import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '@/components/Table';
import {  IconDelete, IconEye } from '@/components/icons';

import { privateRequest } from '@/config/axiosConfig';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import IconCheck from '@/components/icons/IconCheck';
import LoadingPage from '@/components/shared/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, trashUser } from '@/store/slices/userSlice';
import Pagination from '@/components/shared/Pagination';


function ManageUsers() {
    const{loading, users} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());

    }, []);

    const handleDeletePost = async (id) => {
        dispatch(trashUser({id, flag:true}));
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
                                            {user.firstName + ' ' + user.lastName}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">{user.email}</span>
                                    </td>
                                    <td>
                                        <span className="text-gray-500">{user.address}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            <Link
                                                to={`/profile/${user.id}`}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconEye />
                                            </Link>
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

            {loading && <LoadingPage/>}
            {users?.totalPage > 1 && (
               <Pagination isNext={users?.last} pageNumber={users?.pageNo} />
            )}
        </div>
    );
}

export default ManageUsers;
