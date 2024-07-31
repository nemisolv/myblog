import { Link, useNavigate } from 'react-router-dom';

const AccountItem = ({ user, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        // navigate(`/users/${user.id}/profile`);

        onClick();
    };
    return (
        <a
            href={`/users/${user.id}/profile`}
            className="flex items-center gap-x-3 p-1 cursor-pointer hover:bg-[#16182308] "
            onClick={handleClick}
        >
            <div className="pl-3">
                <img
                    src={user.avatar || '/user-default.jpg'}
                    className=" w-8 h-8 object-cover rounded-full shadow"
                    alt="user's avatar"
                />
            </div>
            <h2 className="text-gray-600 text-sm">{user.first_name + ' ' + user.last_name}</h2>
        </a>
    );
};

export default AccountItem;
