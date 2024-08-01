import UserService from '@/services/user.service';
import { call, put } from 'redux-saga/effects';
import { getALlUsersFailure, getAllUsersSuccess, trashUserFailure, trashUserSuccess } from '../slices/userSlice';
import { toggleEnableTFAFailure, toggleEnableTFASuccess } from '../slices/authSlice';

export function* handleGetAllUsersForAdmin({ payload }) {
    try {
        const data = yield call(UserService.getAllUsersForAdmin, payload);
        yield put(getAllUsersSuccess(data));
    } catch (error) {
        console.log('🚀 ~ function*getAllUsersForAdmin ~ error:', error);
        yield put(getALlUsersFailure());
    }
}

export function* handleTrashUser({ payload }) {
    console.log("🚀 ~ function*handleTrashUser ~ payload:", payload)
    try {
        yield call(UserService.trashUser, payload);
        yield put(trashUserSuccess(payload.id));

    } catch (error) {
        yield put(trashUserFailure())
        console.log('🚀 ~ function*handleTrashUser ~ error:', error);
    }
}

export function* handleToggleEnableTFA({ payload }) {
    try {
        yield call(UserService.switchTFA, payload);
        yield put(toggleEnableTFASuccess());
    } catch (error) {
        console.log('🚀 ~ function*handleToggleEnableMFA ~ error:', error);
        yield put(toggleEnableTFAFailure())
    }
}
