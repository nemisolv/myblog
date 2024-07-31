import { useNavigate } from 'react-router-dom';
import dateConverter from '~/utils/convertDate';

function NewestPostItem({ post }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate('/posts/' + post.slug)}
            className="flex flex-1 items-center p-5 bg-[#F3EDFF] border-[0.7px] border-b-slate-300 last:border-b-0 last:rounded-br-xl last:rounded-bl-xl "
        >
            <div>
                <img
                    src={post.thumbnail || '/thumb-default.jpg'}
                    alt=""
                    className="rounded-xl max-w-[180px] max-h-[150px] bg-white  object-cover block cursor-pointer"
                />
            </div>
            <div className="ml-4 ">
                <span className="text-sm rounded-full text-lightGray bg-white  px-3 py-1 ">{post.tag.name}</span>
                <h3 className=" text-sm leading-relaxed mt-2 text-slate-900 cursor-pointer">{post.title}</h3>
                <p className=" flex items-center gap-4 mt-3 text-sm text-lightGray ">
                    <span className="rounded-separate separate-gray relative text-sm">
                        {dateConverter(post.updated_at || post.created_at)}
                    </span>
                    <span>{post.user.first_name + ' ' + post.user.last_name}</span>
                </p>
            </div>
        </div>
    );
}

export default NewestPostItem;
