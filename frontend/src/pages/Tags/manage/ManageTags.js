import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '~/components/Table';
import { IconAdjust, IconDelete } from '~/components/icons';

import { axiosPrivate } from '~/config/axiosConfig';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '~/components/Button';
import SpinLoader from '~/components/Loader';

function ManageTags() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosPrivate.get(`tags`);
                setLoading(false);
                console.log(response.data);
                setTags(response.data);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };

        fetchData();
    }, []);

    const handleDeleteTag = async (id) => {
        try {
            await axiosPrivate.delete('tags/' + id);
            setTags(tags.filter((tag) => tag.id !== id));
            toast.success('Tag deleted successfully');
        } catch (e) {
            toast.error(e.response.data.message);

            console.log(e);
        }
    };

    const onDelete = (id) => {
        return confirmAlert({
            title: 'Confirm',
            message: "Are you sure you want to delete this Tag's id:" + id,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDeleteTag(id),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    return (
        <div className="  w-[800px] mx-auto">
            <div className="relative">
                {' '}
                <h1 className="text-primary font-medium text-2xl text-center mb-10">Manage tags</h1>
                <span className="absolute right-0 ">
                    <Button primary to="/manage/add-tag">
                        Add new Tag
                    </Button>
                </span>
            </div>

            {!loading && (
                <div className="mt-24">
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>{tag.id}</td>
                                    <td>
                                        <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-primary text-gray-100 ">
                                            {tag.name}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            <Link
                                                to={`/manage/update-tag/${tag.id}`}
                                                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
                                            >
                                                <IconAdjust />
                                            </Link>
                                            <span
                                                onClick={() => onDelete(tag.id)}
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
        </div>
    );
}

export default ManageTags;
