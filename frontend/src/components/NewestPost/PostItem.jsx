import dateConverter from '@/utils/convertDate';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

function PostItem({ post }) {
    const navigate = useNavigate();
    return (
        <>
            {post && (
                <div
                    onClick={() => navigate('/posts/' + post.slug)}
                    className="shadow-sm border-r border-r-slate-100   pr-3 select-none"
                >
                    <div className="h-[202px]">
                        <img
                            src={post.thumbnail || '/thumb-default.jpg'}
                            alt=""
                            className="rounded-xl w-full h-full object-cover block"
                        />
                    </div>
                    <div className="feature-item-content mt-6 p-3">
                        <span className="text-sm rounded-full text-lightGray bg-[#F3EDFF]  px-3 py-1 ">
                            {post.tag.name}
                        </span>
                        <h3 className=" text-sm leading-relaxed mt-2 line-clamp-2">
                            {post.title.length < 80 ? parse(post.title) : parse(post.title.slice(0, 80).concat('...'))}
                        </h3>
                        <p className=" flex items-center gap-4 mt-3 text-sm text-lightGray ">
                            <span className="rounded-separate separate-gray relative">
                                {dateConverter(post.updated_at || post.createdAt)}
                            </span>
                            <span>{post.user.firstName + ' ' + post.user.lastName}</span>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostItem;
