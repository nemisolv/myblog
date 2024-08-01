import { call, put } from 'redux-saga/effects';
import { saveToken } from '@/utils/auth';
import { toast } from 'react-toastify';
import AuthService from '@/services/auth.service';
import { loginFailure, loginSuccess, registerFailure, updateProfileFailure, updateProfileSuccess } from '../slices/authSlice';
import UserService from '@/services/user.service';

export function* handleAuthRegister(action) {
    const { payload } = action;
    try {
        yield call(AuthService.register, payload);
        toast.success('Please verify your email');
    } catch (error) {
        console.log('🚀 ~ function*handleAuthRegister ~ error:', error);
        toast.error('Failed to register. Please try again.');
        yield put(registerFailure())
    }
}
export function* handleAuthLogin(action) {
    const { payload } = action;
    try {
        const { navigate } = payload;
        const res = yield call(AuthService.login, payload);
        if (res.token && res.refreshToken) {
            const { token, refreshToken, userData } = res;
            saveToken(token, refreshToken);
            localStorage.setItem('user', JSON.stringify(userData));
            yield put(loginSuccess(userData));
            navigate('/');
        } else {
            localStorage.setItem('mfaEnabled', true);
            localStorage.setItem('secretImageUri', res.secretImageUri);
            window.location.reload();
        }
    } catch (error) {
        console.log('🚀 ~ function*handleAuthLogin ~ error:', error);
        toast.error('Failed to login. Please try again.');
        yield put(loginFailure())
    }
}


export function* handleUpdateProfile({payload}) {
    try {
       const data =  yield call(UserService.updateProfile, payload);
        // localStorage.setItem('user', JSON.stringify(res));
        yield put(updateProfileSuccess(data));
        toast.success('Profile updated successfully');
    } catch (error) {
        console.log('🚀 ~ function*handleUpdateProfile ~ error:', error);
        toast.error('Failed to update profile. Please try again.');
        yield put(updateProfileFailure())
    }
}