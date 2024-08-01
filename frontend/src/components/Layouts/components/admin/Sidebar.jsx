import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconDelete, IconLock, IconSettings } from '@/components/icons';
import IconDashboard from '@/components/icons/IconDashBoard';
import IconDocument from '@/components/icons/IconDocument';
import IconGroupUser from '@/components/icons/IconGroupUser';
import IconTag from '@/components/icons/IconTag';
import IconToggleBar from '@/components/icons/IconToggleBar';


const sidebarLinks = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: <IconDashboard />,
    },
    {
        name: 'Tags',
        path: '/admin/manage/tags',
        icon: <IconTag />,
    },
    {
        name: 'Posts',
        path: '/admin/manage/posts',
        icon: <IconDocument />,
    },
    {
        name: 'Users',
        path: '/admin/manage/users',
        icon: <IconGroupUser />,
    },
    // {
    //     name: 'Settings',
    //     path: '/admin/manage/settings',
    //     icon: <IconSettings />,
      
    // },
    {
        name: 'Security',
        path: '/admin/security',
        icon: <IconLock/>
    },

    {
        name: 'Trash',
        path: '/admin/manage/trash',
        icon: <IconDelete />,
    },
];

function SideBar() {
    const [show, setShow] = useState(true);
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div
            className={`flex flex-col items-center max-w-[300px] w-full shadow-md rounded-lg min-h-screen ${
                show ? '' : '-translate-x-[30%] max-w-[80px] w-full'
            }`}
        >
            <div className="flex w-full items-center py-2 px-6">
                <h3
                    className={`text-xl text-center text-primary font-medium overflow-hidden transition-all ${
                        show ? 'w-full' : 'w-0'
                    }`}
                >
                    Nemisol
                </h3>
                <span className="ml-auto cursor-pointer hover:text-primary" onClick={() => setShow(!show)}>
                    <IconToggleBar />
                </span>
            </div>
            {sidebarLinks.map((link) => (
                <div key={link.name} className=" w-full  rounded-lg mb-2 overflow-hidden transition-all">
                    <Link
                        to={link.path}
                      
                        className={`flex items-center text-center gap-x-5 px-5 py-3   hover:bg-primary hover:text-white hover:bg-opacity-20 ${pathname === link.path ? 'text-white bg-primary bg-opacity-20' : ''}`}
                    >
                        <span className={` transition-all  overflow-hidden  ${show ? '' : ''}`}>{link.icon}</span>
                        <span className={`overflow-hidden transition-all  ${show ? ']' : 'hidden'}`}>{link.name}</span>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}

export default SideBar;
