import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <>
            <Provider store={store}>
                <App />
            </Provider>
            <ToastContainer style={{ paddingRight: '20px' }} />
        </>
    </React.StrictMode>,
);

reportWebVitals();
