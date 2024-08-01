import IconArrowLeft from '@/components/icons/IconArrowLeft';
import {  Outlet, useNavigate } from 'react-router-dom';
import Header from './components/admin/Header';
import SideBar from './components/admin/Sidebar';

function AdminLayout() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="">
            <Header />
            <div className="  mx-4 min-h-screen  flex items-start gap-4 mt-10">
                <SideBar />
                <main className="flex-1 mx-4 relative">
                    <span onClick={goBack} className=" top-0 cursor-pointer inline-block ">
                        <IconArrowLeft />
                    </span>
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
export default AdminLayout;
