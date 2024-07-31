import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {  routes } from '~/routes';
import DefaultLayout from '~/components/Layouts/DefaultLayout';
import { Fragment, useEffect } from 'react';
import AdminLayout from './components/Layouts/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import { authRefreshToken, authUpdateUserInfo } from './store/auth/authSlice';
import { getToken, logOut } from './utils/auth';
import { jwtDecode } from 'jwt-decode';
import PageNotFound from './pages/PageNotFound';

function App() {
    const { user, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const { access_token } = getToken();
        if (access_token) {
            if (!user) {
                var decoded = jwtDecode(access_token);
                if (decoded) {
                    if (decoded.exp * 1000 < Date.now()) {
                        const { refresh_token } = getToken();
                        if (refresh_token) {
                            var decodedRefresh = jwtDecode(refresh_token);
                            if (decodedRefresh) {
                                if (decodedRefresh.exp * 1000 < Date.now()) {
                                    logOut();
                                } else {
                                    dispatch(authRefreshToken(refresh_token));
                                    dispatch(
                                        authUpdateUserInfo({
                                            user: decoded.user,
                                            role: decoded.roles,
                                            isLoggedIn: true,
                                        }),
                                    );
                                }
                            }
                        } // if refresh token is also expired
                        else {
                            dispatch(authUpdateUserInfo({}));
                            // remove both of the refresh and access tokens
                            logOut();
                        }
                    } else {
                        dispatch(
                            authUpdateUserInfo({
                                user: decoded.user,
                                role: decoded.roles,
                                isLoggedIn: true,
                            }),
                        );
                    }
                } else {
                    dispatch(authUpdateUserInfo({}));
                    // remove both of the refresh and access tokens
                    logOut();
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    let Layout = route.layout === null ? Fragment : DefaultLayout;
                    const { permissions, requiresAuth } = route.meta || {};
                    if (user) {
                        if (permissions === 'ADMIN' && role == 'USER')
                            return <Route key={index} path={route.path} element={<PageNotFound />} />;
                    } else {
                        if (permissions === 'ADMIN' || requiresAuth)
                            return <Route key={index} path={route.path} element={<Fragment />} />;
                    }
                    if (permissions === 'ADMIN') {
                        Layout = AdminLayout;
                    }

                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
