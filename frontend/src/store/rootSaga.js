import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import tagSaga from "./tag/saga";
import postSaga from "./post/saga";
import userSaga from "./user/saga";
export default function* rootSaga(){
    yield all([fork(authSaga),
        fork(tagSaga),
        fork(postSaga),
        fork(userSaga)
    ])

};