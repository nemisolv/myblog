import Header from './components/client/Header';
import Footer from './components/client/Footer';
import { Outlet } from 'react-router-dom';

function DefaultLayout() {
    return (
        <>
            <Header />
            <div className="page-container mt-[56px]">
                <div className="content mx-auto ">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
