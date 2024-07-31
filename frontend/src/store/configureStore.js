import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from '~/store/auth/authSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
