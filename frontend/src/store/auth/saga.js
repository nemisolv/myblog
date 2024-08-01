import { takeLatest } from 'redux-saga/effects';
import { login, register, updateProfile } from '../slices/authSlice';
import { handleAuthLogin, handleAuthRegister, handleUpdateProfile } from './handle';

export default function* authSaga() {
    yield takeLatest(register.type, handleAuthRegister);
    yield takeLatest(login.type, handleAuthLogin);
    yield takeLatest(updateProfile.type, handleUpdateProfile)
    // yield takeLatest(authEnableTFA.type,handleAuthEnableTFA);
}
