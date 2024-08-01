import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from '@/store/slices/authSlice';
import tagReducer from '@/store/slices/tagSlice';
import postReducer from '@/store/slices/postSlice';
import userReducer from '@/store/slices/userSlice';



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tag: tagReducer,
        post: postReducer,
        user: userReducer,
    },
    middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
