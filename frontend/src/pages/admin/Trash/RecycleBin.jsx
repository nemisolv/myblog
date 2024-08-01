import { useEffect, useState } from 'react';
import { IconDelete } from '@/components/icons';
import IconArrowUTurnLeft from '@/components/icons/IconArowUTurnLeft';
import { privateRequest } from '@/config/axiosConfig';
import { toast } from 'react-toastify';
import LoadingPage from '@/components/shared/LoadingPage';
function RecycleBin() {
    const [trashedPosts, setTrashedPosts] = useState([]);
    const [trashedUsers, setTrashedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postRes = await privateRequest.get('posts/trashed');
                const userRes = await privateRequest.get('users/trashed');
                setTrashedPosts(postRes);
                setTrashedUsers(userRes);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingPage />;

    const handleRestore = async (id, flag) => {
        try {
            if (flag === 'post') {
                await privateRequest.patch(`posts/${id}/trashed/false`);
                setTrashedPosts(trashedPosts.filter((post) => post.id !== id));
            } else if (flag === 'user') {
                await privateRequest.patch(`users/${id}/trashed/false`);
                setTrashedUsers(trashedUsers.filter((user) => user.id !== id));
            }
            toast.success('Restore data successfully');
        } catch (e) {
            toast.error(e.response.data.message);
            console.log(e);
        }
    };

    const handleDeletePermanently = async (id, flag) => {
        try {
            if (flag === 'post') {
                await privateRequest.delete(`posts/${id}/delete-permanently`);
                setTrashedPosts(trashedPosts.filter((post) => post.id !== id));
            } else if (flag === 'user') {
                await privateRequest.delete(`users/${id}/delete-permanently`);
                setTrashedUsers(trashedUsers.filter((user) => user.id !== id));
            }
            toast.success('Delete data successfully');
        } catch (e) {
            toast.error(e.response.data.message);
            console.log(e);
        }
    };

    return (
        <div className="page-container w-[800px]">
            <ToggleList
                title="Posts"
                items={trashedPosts.map((post) => ({
                    name: post.title,
                    id: post.id,
                    flag: 'post',
                    image: post.thumbnail,
                    IconRestore: IconArrowUTurnLeft,
                    handleRestore,
                    handleDeletePermanently,
                    IconDelete: IconDelete,
                }))}
            />
            <ToggleList
                title="Users"
                items={trashedUsers.map((user) => ({
                    name: user.firstName + ' ' + user.lastName,
                    id: user.id,
                    flag: 'user',
                    image: user.avatar,
                    IconRestore: IconArrowUTurnLeft,
                    handleRestore,
                    handleDeletePermanently,

                    IconDelete: IconDelete,
                }))}
            />
        </div>
    );
}

export default RecycleBin;

function ToggleList({ title, items }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <details className={`${isOpen ? 'border-b-2 border-primary' : ''}`}>
            <summary className="text-primary cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {title}
            </summary>
            <ul
                className={`${
                    isOpen ? 'block' : 'none'
                } transition-max-height duration-300 ease-in-out overflow-hidden`}
            >
                {items.length > 0 &&
                    items.map((item) => (
                        <li
                            key={item.id}
                            className="px-5 py-1 flex justify-between text-[#37352f] hover:bg-[#37352f14]"
                        >
                        <img src={item.image} className='size-6 rounded-full object-cover' alt="" />
                            <span>{item.name}</span>
                            <span className="text-[#a5a4a1] flex gap-x-3 cursor-pointer">
                                <span
                                    onClick={() => item.handleRestore(item.id, item.flag)}
                                    title={`restore this ${item.flag}`}
                                    className="hover:text-slate-700"
                                >
                                    <item.IconRestore />
                                </span>
                                {/* <span
                                    title={`delete permanently this ${item.flag}`}
                                    onClick={() => item.handleDeletePermanently(item.id, item.flag)}
                                    className="hover:bg-gray-300"
                                >
                                    <item.IconDelete color="text-[#a5a4a1]" />
                                </span> */}
                            </span>
                        </li>
                    ))}
                {items.length === 0 && (
                    <div className="flex flex-col text-center">
                        <span className="text-[#a5a4a1] ">Trash is empty!</span>

                        {/* only if user has role 'ADMIN'  */}
                        <div className="flex justify-center items-center my-4 ">
                            <IconDelete />
                        </div>
                    </div>
                )}
            </ul>
        </details>
    );
}
