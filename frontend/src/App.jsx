import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import LoadingPage from './components/shared/LoadingPage';

const DefaultLayout = lazy(() => import('@/components/Layouts/DefaultLayout'));
const AdminLayout = lazy(() => import('@/components/Layouts/AdminLayout'));

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AddPost = lazy(() => import('@/pages/admin/Posts/Add'));
const ManagePosts = lazy(() => import('@/pages/admin/Posts/ManagePosts'));
const PostDetail = lazy(() => import('@/pages/PostDetail'));
const UpdatePost = lazy(() => import('@/pages/admin/Posts/Update'));
const ManageUsers = lazy(() => import('@/pages/admin/Users/ManageUsers'));
const Trash = lazy(() => import('@/pages/admin/Trash/RecycleBin'));
const OwnerProfile = lazy(() => import('@/pages/Profile/EditProfile'));
const Profile = lazy(() => import('@/pages/Profile/Profile'));
const Security = lazy(() => import('@/pages/Security'));
const OAuth2RedirectHandler = lazy(() => import('@/utils/OAuth2RedirectHandler'));
const VerifyEmail = lazy(() => import('@/pages/VerifyEmail'));
const Settings = lazy(() => import('@/pages/Settings'));
const ManageTags = lazy(() => import('@/pages/admin/Tags/ManageTags'));
const AddTag = lazy(() => import('@/pages/admin/Tags/Add'));
const UpdateTag = lazy(() => import('@/pages/admin/Tags/Update'));
const Post = lazy(() => import('@/pages/PostDetail'));
const RecycleBin = lazy(() => import('@/pages/admin/Trash/RecycleBin'));

function App() {

    return (
        <Router>
            <Suspense fallback={<LoadingPage />}>
                <Routes>
                    {/* no layout */}
                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                    </Route>

                    {/* default layout */}
                    <Route path="/" element={<DefaultLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/profile/:id/edit" element={<OwnerProfile />} />
                        <Route path='/posts/:slug' element={<Post />} />
                        <Route path="security" element={<Security />} />
                    </Route>
                    {/* admin layout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="manage/add-post" element={<AddPost />} />
                        <Route path="manage/update-post/:id" element={<UpdatePost />} />
                        <Route path="manage/posts" element={<ManagePosts />} />
                        <Route path="manage/tags" element={<ManageTags />} />
                        <Route path="manage/add-tag" element={<AddTag />} />
                        <Route path="manage/update-tag/:id" element={<UpdateTag />} />
                        <Route path="manage/users" element={<ManageUsers />} />
                        <Route path="manage/trash" element={<RecycleBin />} />
                        <Route path="settings" element={<Settings />} />
                        {/* <Route path="security" element={<Security />} /> */}
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
