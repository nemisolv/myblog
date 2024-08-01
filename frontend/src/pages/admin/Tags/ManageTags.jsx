import { Link } from 'react-router-dom';
import Table from '@/components/Table';
import { IconAdjust, IconDelete } from '@/components/icons';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteTag, getAllTags } from '@/store/slices/tagSlice';
import LoadingPage from '@/components/shared/LoadingPage';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function ManageTags() {
    const { tags, loading } = useSelector((state) => state.tag);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTags());
    }, []);

    const handleDeleteTag = async (id) => {
        dispatch(deleteTag(id));
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
        <div className="  w-[800px] mx-auto flex flex-col gap-3">
            <div className="relative  ">
                <h1 className="text-primary font-medium text-2xl text-center mb-10">Manage tags</h1>
                <span className="absolute right-0 ">
                    <Button primary to="/admin/manage/add-tag">
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
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger> <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded bg-primary text-gray-100 ">
                                            {tag.name}
                                        </span></TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{tag.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                       
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-x-3 text-gray-500">
                                            <Link
                                                to={`/admin/manage/update-tag/${tag.id}`}
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

            {loading && <LoadingPage />}
        </div>
    );
}

export default ManageTags;
