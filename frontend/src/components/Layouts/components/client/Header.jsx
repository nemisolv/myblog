import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Menu from '@/components/Popper/Menu';
import IconProfile from '@/components/icons/IconProfile';
import { IconDashBoard, IconLock, IconLogout } from '@/components/icons';
import { logOut } from '@/utils/auth';

import Search from '@/components/Search';

const menuLinks = [
    {
        title: 'Home',
        path: '/',
    },
    {
        title: 'Blog',
        path: '#',
    },
    {
        title: 'About Me',
        path: '#about',
    },
];

function Header() {
    const { currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleLogout =  () => {
        logOut(navigate);
    };

    const userLinks = [
        {
            title: 'Profile',
            icon: <IconProfile />,
            onClick: () => navigate(`/profile/${currentUser.id}`),
        },
        currentUser?.roles?.includes('ADMIN') && {
            title: 'Dashboard',
            icon: <IconDashBoard />,
            onClick: () => navigate('/admin/dashboard'),
        },
        currentUser?.authProvider === 'local' && {
            title: 'Security',
            icon: <IconLock />,
            onClick: () => navigate('/security'),
        },
        {
            title: 'Logout',
            icon: <IconLogout />,
            onClick: handleLogout,
        },
    ].filter(Boolean); // remove falsy values to ensure css works properly

    return (
        <header className="header flex items-center justify-between page-container max-h-[66px]   mt-10">
            <div className="nav-left flex items-center gap-10 h-full">
                <Link to="/">
                    <img
                        className="w-[70px] "
                        src="https://cdn.dribbble.com/users/1769954/screenshots/3821455/media/54be0f77b13471a85cb7e55e90a2de7c.png?resize=400x300&vertical=center"
                        alt="logo"
                    />
                </Link>
                <ul className="menu flex items-center gap-10">
                    {menuLinks.map((item, index) => {
                        return (
                            <Link to={item.path} key={index} className="">
                            {item.title}
                            </Link>
                        );
                    })}
                </ul>
            </div>

            <div className="nav-right flex items-center gap-10 ">
                <Search />

                {currentUser && (
                    <Menu items={userLinks}>
                        <div className="actions">
                            <div className="flex gap-x-4 items-center">
                                <span>
                                    Hello,
                                    <span className="font-medium capitalize">
                                        {currentUser.firstName + ' ' + currentUser.lastName}
                                    </span>
                                </span>
                                <img
                                    src={currentUser?.avatar || '/thumb-default.jpg'}
                                    className="w-[45px] h-[45px] object-cover border rounded-full"
                                    alt="avatar"
                                />
                            </div>
                        </div>
                    </Menu>
                )}

                {!currentUser && (
                    <Button primary to="/login">
                        Sign In
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;
