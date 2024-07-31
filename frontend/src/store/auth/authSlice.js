import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: undefined,
        role: null,
        isLoggedIn: false,
        // accessToken: null,
    },
    reducers: {
        authLogin: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        authRegister: (state, action) => ({ ...state, ...action.payload }),
        // authFetchMe: (state, action) => ({
        //     ...state,...action.payload
        // }),
        authUpdateUserInfo: (state, action) => ({
            ...state,
            user: action.payload.user,
            role: action.payload.role,
            isLoggedIn: action.payload.isLoggedIn,
            // accessToken: action.payload.token,
        }),
        authRefreshToken: (state, action) => {
            return {
                ...state,
            };
        },
        authEnableTFA: (state, action) => {
            // return {
            // ...state, ...action.payload
            state.user.mfaEnabled = action.payload.mfaEnabled;
            // }
        },
    },
});

export const { authLogin, authRegister, authUpdateUserInfo, authFetchMe, authRefreshToken, authEnableTFA } =
    authSlice.actions;

export default authSlice.reducer;
