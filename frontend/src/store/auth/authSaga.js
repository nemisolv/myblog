import { takeLatest } from 'redux-saga/effects';
import { authLogin, authRefreshToken, authRegister } from './authSlice';
import { handleAuthLogin, handleAuthRegister, hanleAuthRefreshToken } from './authHandler';

export default function* authSaga() {
    yield takeLatest(authRegister.type, handleAuthRegister);
    yield takeLatest(authLogin.type, handleAuthLogin);
    yield takeLatest(authRefreshToken.type, hanleAuthRefreshToken);
    // yield takeLatest(authEnableTFA.type,handleAuthEnableTFA);
}
