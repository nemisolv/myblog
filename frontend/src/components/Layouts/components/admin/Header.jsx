import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Menu from '@/components/Popper/Menu';
import IconProfile from '@/components/icons/IconProfile';
import { IconDashBoard, IconLogout } from '@/components/icons';
import { logOut } from '@/utils/auth';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Header() {
    const navigate = useNavigate();
    const { user, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        logOut();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const handleProfile = () => {
        navigate('/me/profile');
    };

    const userLinks = [
        {
            title: 'Profile',
            icon: <IconProfile />,
            onClick: handleProfile,
        },
        role == 'ADMIN' && {
            title: 'Dashboard',
            icon: <IconDashBoard />,
            onClick: () => navigate('/dashboard'),
            meta: {
                requiresAuth: true,
                permissions: 'ADMIN',
            },
        },
        {
            title: 'Logout',
            icon: <IconLogout />,
            onClick: handleLogout,
        },
    ];

    return (
        <header>
            <div className="header flex items-center justify-between px-[16px] max-h-[66px] mt-10  border-b-[1px] border-b-slate-300 pb-5">
                <div className="nav-left flex items-center gap-10 h-full ">
                    <Link to="/">
                        <img className="w-[150px] " src="/logo.png" alt="logo" />
                    </Link>
                </div>

                <div className="flex gap-x-10">
                    <Button to="/admin/manage/add-post">Write new Post</Button>
                    {user && (
                        <Menu items={userLinks}>
                            <div className="actions">
                                <div className="flex gap-x-4 items-center">
                                    <span>
                                        Hello,
                                        <span className="font-medium capitalize">
                                            {user.first_name + ' ' + user.last_name}
                                        </span>
                                    </span>
                                    <img
                                        src={user.avatar || '/thumb-default.jpg'}
                                        className="w-[45px] h-[45px] object-cover border rounded-full"
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
