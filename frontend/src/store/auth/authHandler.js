import { call, put } from 'redux-saga/effects';
import { authRequestEnableTFA, authRequestLogin, authRequestRefreshToken, authRequestRegister } from './authRequest';
import { saveToken } from '~/utils/auth';
import { toast } from 'react-toastify';
import { authEnableTFA } from './authSlice';

export function* handleAuthRegister(action) {
    const { payload } = action;
    try {
        yield call(authRequestRegister, payload);
        toast.success('Please verify your email');
        // setTimeout(() => {
        //     window.location.href = '/login';
        // }, 3000);
    } catch (error) {
        console.log('🚀 ~ function*handleAuthRegister ~ error:', error);
        if (error.response.status === 400) {
            toast.error(error.response.data.errors[0]);
        } else {
            console.log('🚀 ~ function*handleAuthRegister ~ error:', error);
        }
    }
}
export function* handleAuthLogin(action) {
    const { payload } = action;
    try {
        const res = yield call(authRequestLogin, payload);
        if (res.status === 200) {
            if (res.data.token) {
                saveToken(res.data.token, res.data.refreshToken);
                window.location.href = '/';
            } else {
                localStorage.setItem('mfaEnabled', true);
                localStorage.setItem('secretImageUri', res.data.secretImageUri);
                window.location.reload();
            }
        }

        // yield call(handleAuthFetchMe, { payload: res.data.token });
    } catch (error) {
        if (error.response.status === 400) {
            toast.error('Failed to log in. Please try again.');
        } else {
            console.log('🚀 ~ function*handleAuthLogin ~ error:', error);
        }
    }
}

export function* hanleAuthRefreshToken({ payload }) {
    try {
        const response = yield call(authRequestRefreshToken, payload);
        console.log('response refresh duoc lam moi' + response);
        if (response.data) {
            console.log('🚀 ~ function*hanleAuthRefreshToken ~ response.data:', response.data);

            saveToken(response.data.token, response.data.refreshToken);
        }
    } catch (e) {
        console.log('🚀 ~ function*hanleAuthRefreshToken ~ e:', e);
    }
}

// export function* handleAuthEnableTFA({ payload }) {
//     console.log('🚀 ~ function*handleAuthEnableTFA ~ payload:', payload);
//     try {
//         const res = yield call(authRequestEnableTFA, payload);
//         // yield put(authEnableTFA(payload.enable));
//         saveToken(res.token, res.refreshToken);
//         console.log('login thành công: ' + res);
//         localStorage.removeItem('mfaEnabled');
//         localStorage.removeItem('secretImageUri');
//         localStorage.removeItem('email');
//         window.location.href = '/';
//     } catch (e) {
//         console.log('🚀 ~ function*handleAuthEnableTFA ~ e:', e);
//     }
// }
