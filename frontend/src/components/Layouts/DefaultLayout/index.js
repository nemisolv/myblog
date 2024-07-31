import { Fragment } from 'react';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';

function DefaultLayout({ children }) {
    return (
        <Fragment>
        <Header />
            <div className='page-container'>
                <div className="content">{children}</div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
