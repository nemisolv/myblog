// import { saveToken } from '~/utils/auth';

// const { axiosPublic } = require('~/config/axiosConfig');

// export default class AuthService {
//     static async verifyTFA(data) {
//         console.log('🚀 ~ AuthService ~ verifyTFA ~ data:', data);
//         try {
//             const res = await axiosPublic.post('auth/verify', data);
//             return res.data;
//         } catch (e) {
//             console.log('��� ~ AuthService ~ verifyTFA=async ~ e:', e);
//         }
//     }

//     getUrlParameter(name, search) {
//         name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//         var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//         var results = regex.exec(search);
//         return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
//     }

//     handleRedirect(location) {
//         const token = this.getUrlParameter('token', location.search);
//         const refreshToken = this.getUrlParameter('refreshToken', location.search);
//         // const error = this.getUrlParameter('error', location.search);

//         if (token) {
//             saveToken(token, refreshToken);
//             window.location.href = '/';
//         } else {
//             window.location.href = '/login';
//         }
//     }
// }

import { saveToken } from '~/utils/auth';

// const { axiosPublic } = require('~/config/axiosConfig');
import axios from 'axios';
import { GOOGLE_AUTH_URL } from '~/constants';
import { axiosPublic } from '~/config/axiosConfig';

export default class AuthService {
    static async verifyTFA(data) {
        try {
            const res = await axiosPublic.post('auth/verify', data);
            return res.data;
        } catch (e) {
            console.log('��� ~ AuthService ~ verifyTFA=async ~ e:', e);
        }
    }

    static async verifyEmail(token) {
        return await axiosPublic.get('auth/verify-email?token=' + token);
    }
}
