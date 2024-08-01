import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    users: null,
    user: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAllUsers: state => {state.loading = true},
        getAllUsersSuccess: (state, {payload}) => {
            state.users = payload;
            state.loading = false;
        },

        getALlUsersFailure: state => {state.loading = false},

        trashUser: (state) => {
            state.loading = true;
        
        },
        trashUserSuccess: (state, {payload}) => {
            state.users.data = state.users?.data?.filter(user => user.id !== payload);
            state.loading = false;
        },
        trashUserFailure: state => {state.loading = false},

        
    }
})

export const {getAllUsers, getAllUsersSuccess, getALlUsersFailure,
    trashUser, trashUserSuccess, trashUserFailure,
} = userSlice.actions;
export default userSlice.reducer;