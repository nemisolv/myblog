import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

const PostItemSummary = ({ post, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate(`/posts/${post.slug}`);

        onClick();
    };
    return (
        <a
            href={`/posts/${post.slug}`}
            className="flex items-center gap-x-3 p-1 cursor-pointer hover:bg-[#16182308] "
            onClick={handleClick}
        >
            <div className="pl-3">
                <img
                    src={post.thumbnail || '/thumb-default.jpg'}
                    className=" w-8 h-8 object-cover rounded-full shadow"
                    alt="user's avatar"
                />
            </div>
            <h2 className="text-gray-600 text-sm">{parse(post.title.slice(0, 20).concat('...'))}</h2>
        </a>
    );
};

export default PostItemSummary;
