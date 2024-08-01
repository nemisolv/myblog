import { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import Button from './Button';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { privateRequest, publicRequest } from '@/config/axiosConfig';
import Loading from './shared/Loading';
import LoadingPage from './shared/LoadingPage';

function Comment({ postId }) {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [holdCmt, setHoldCmt] = useState();
    const [cancel, setCancel] = useState(false);
    const inputRef = useRef();
    const postBtnRef = useRef();

    useEffect(() => {
        const fetchCmts = async () => {
            try {
                setLoading(true);
                const response = await publicRequest.get(`posts/${postId}/comments`);
                setComments(response);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        };

        fetchCmts();
    }, [postId]);
    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('To comment, you must be logged in first. ');
            navigate('/login');
        }
        if (!comment) {
            toast.error('Please enter a comment');
            return;
        }
        try {
            // if edit mode
            if (cancel) {
                const res = await privateRequest.patch(`comments/${holdCmt.id}`, { message: comment });
                console.log(res.data);
                setComments(
                    comments.map((comment) => {
                        if (comment.id === holdCmt.id) {
                            comment = res.data;
                        }
                        return comment;
                    }),
                );
            } else {
                console.log('post duowc khong');
                const res = await privateRequest.post(`/comments`, { message: comment, post_id: postId });
                setComments((prev) => [res.data, ...prev]);
            }

            setComment('');
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit = async (cmt) => {
        try {
            postBtnRef.current.innerText = 'Edit';
            inputRef.current.focus();
            setCancel(true);
            setHoldCmt(cmt);
            setComment(cmt.message);
        } catch (error) {
            setLoading(false);
            if (error.response.status === 400) {
                toast.error(error.response.data?.message);
            }
        }
    };
    const handleCancel = () => {
        postBtnRef.current.innerText = 'Post comment';
        setComment('');
        setCancel(false);
    };

    const handleDeleteCmt = async (id) => {
        await privateRequest.delete(`comments/${id}`);
        setComments(comments.filter((comment) => comment.id !== id));
    };

    const onDelete = (id) => {
        return confirmAlert({
            title: 'Delete comment?',
            message: "Are you sure you want to delete your comment? You can't undo this",
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => handleDeleteCmt(id),
                },
                {
                    label: 'Cancel',
                    className: 'bg-red-600 rounded-full',
                },
            ],
        });
    };

    console.log('comments::', comments);
    // if (!comments || comments.length === 0) return;
    return (
        <section className="bg-white py-8 antialiased">
            {!loading && (
                <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Discussion ({comments.length})</h2>
                    </div>
                    {comments.length === 0 && <div className="text-gray-600 text-center my-5"> No comments yet.</div>}

                    <form className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
                            <label htmlFor="comment" className="sr-only text-slate-500">
                                Your comment
                            </label>
                            <textarea
                                ref={inputRef}
                                id="comment"
                                rows={6}
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                                placeholder="Write a comment..."
                                required
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            />
                        </div>
                        <button
                            ref={postBtnRef}
                            onClick={handlePostComment}
                            type="submit"
                            className="  inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg  primary hover:bg-primary"
                        >
                            Post comment
                        </button>
                        {cancel && (
                            <Button
                                outline
                                onClick={handleCancel}
                                type="button"
                                className="ml-6 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-primary"
                            >
                                Cancel
                            </Button>
                        )}
                    </form>
                    {comments.length > 0 &&
                        comments.map((cmt) => (
                            <article key={cmt.id} className="p-6 text-base bg-white rounded-lg border-b">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                            <img
                                                className="mr-2 w-8 h-8 rounded-full border"
                                                src={cmt.user.avatar || '/thumb-default.jpg'}
                                                alt="Michael Gough"
                                            />
                                            {cmt.user.first_name + ' ' + cmt.user.last_name}
                                        </p>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {formatDistanceToNow(cmt.updated_at || cmt.created_at) + ' ago'}
                                        </span>
                                    </div>
                                </footer>
                                <p className="text-gray-500 400">{cmt.message}</p>
                                {user && user.id === cmt.user.id && (
                                    <div className="flex items-center mt-4 space-x-4">
                                        {/* check if this comment is belong to own user */}
                                        <button
                                            onClick={() => handleEdit(cmt)}
                                            className="flex items-center text-sm text-gray-500 hover:underline 400 font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(cmt.id)}
                                            className="flex items-center text-sm text-gray-500 hover:underline 400 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </article>
                        ))}
                </div>
            )}
            {loading && <LoadingPage />}
        </section>
    );
}
export default Comment;
