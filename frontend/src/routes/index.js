import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import PageNotFound from '~/pages/PageNotFound';
import Dashboard from '~/pages/Dashboard';
import { AddPost } from '~/pages/Posts/manage';
import ManagePosts from '~/pages/Posts/manage/ManagePosts';
import PostDetail from '~/pages/Posts/display/PostDetail';
import UpdatePost from '~/pages/Posts/manage/Update';
import ManageTags from '~/pages/Tags/manage/ManageTags';
import AddTag from '~/pages/Tags/manage/Add';
import ManageUsers from '~/pages/Users/manage/ManageUsers';
import UpdateTag from '~/pages/Tags/manage/Update';
import Trash from '~/pages/Trash';
import OwnerProfile from '~/pages/Profile';
import Profile from '~/pages/Profile/Profile';
import Security from '~/pages/Security';
import OAuth2RedirectHandler from '~/utils/OAuth2RedirectHandler';
import VerifyEmail from '~/pages/VerifyEmail';
import Settings from '~/pages/Settings';
import MailTemplate from '~/pages/Settings/MailTemplate';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/me/profile',
        component: OwnerProfile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/users/:userId/profile',
        component: Profile,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
    {
        path: '*',
        component: PageNotFound,
        layout: null,
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/add-post',
        component: AddPost,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/update-post/:id',
        component: UpdatePost,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/posts',
        component: ManagePosts,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/tags',
        component: ManageTags,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/add-tag',
        component: AddTag,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },

    {
        path: '/manage/update-tag/:id',
        component: UpdateTag,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/settings/mail-template',
        component: MailTemplate,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/manage/users',
        component: ManageUsers,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
    {
        path: '/posts/:slug',
        component: PostDetail,
    },
    {
        path: '/manage/trash',
        component: Trash,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },

    {
        path: '/security',
        component: Security,
    },
    {
        path: '/oauth2/redirect',
        component: OAuth2RedirectHandler,
    },
    {
        path: '/verify-email',
        component: VerifyEmail,
        layout: null,
    },
    {
        path: '/manage/settings',
        component: Settings,
        meta: {
            requiresAuth: true,
            permissions: 'ADMIN',
        },
    },
];

const privateRoutes = [];
export { routes, privateRoutes };
