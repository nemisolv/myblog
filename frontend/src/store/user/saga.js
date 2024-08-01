import { takeLatest } from "redux-saga/effects";
import { getAllUsers, trashUser } from "../slices/userSlice";
import { handleGetAllUsersForAdmin, handleToggleEnableTFA, handleTrashUser } from "./handle";
import { toggleEnableTFA } from "../slices/authSlice";

export default function* userSaga() {
    yield takeLatest(getAllUsers.type, handleGetAllUsersForAdmin);
    yield takeLatest(trashUser.type, handleTrashUser);
    yield takeLatest(toggleEnableTFA.type, handleToggleEnableTFA);

}