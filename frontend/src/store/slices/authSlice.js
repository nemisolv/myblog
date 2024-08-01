import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    },
    reducers: {
        login: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, {payload}) => {
            state.currentUser = payload;
            state.loading = false;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        register: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, {payload}) => {
            state.currentUser = payload;
            state.loading = false;
        },
        registerFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            state.currentUser = null;
        },
        updateProfile: (state) => {
            state.loading = true;
        },  
        updateProfileSuccess: (state, {payload}) => {
            state.currentUser = {...state.currentUser, ...payload};
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        updateProfileFailure: (state) => {
            state.loading = false;
        },

        toggleEnableTFA: (state) => {
            state.loading = true;
        },
        toggleEnableTFASuccess: (state, ) => {
            state.currentUser.mfaEnabled = !state.currentUser.mfaEnabled;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        toggleEnableTFAFailure: (state) => {
            state.loading = false;
        }



    },
});

export const {
    login,
    loginSuccess,
    loginFailure,
    register,
    registerSuccess,
    registerFailure,
    logout,
    updateProfile,
    updateProfileSuccess,
    updateProfileFailure,
    toggleEnableTFA,
    toggleEnableTFASuccess, toggleEnableTFAFailure
} = authSlice.actions;

export default authSlice.reducer;
