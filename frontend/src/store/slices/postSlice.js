import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    posts: [],
    loading: false,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getAllPostsForAdmin: (state) => {state.loading = true},
        getAllPostsForUser: (state) => {state.loading = true},
        getAllPostsSuccess: (state, {payload}) => { 
            state.posts = payload;
            state.loading = false;
        },
        getAllPostsFailure: (state) => {state.loading = false},
        deletePost: (state, {payload}) => {
            state.posts.data = state.posts.data.filter((post) => post.id !== payload);
        },
        addPost: (state, ) => {
            
            state.loading = false;
        },
        addPostSuccess: (state, {payload}) => {
            if (!state.posts?.data) {
                state.posts = { data: [] };
            }
            state.posts.data.push(payload);
        },
        addPostFailure: (state) => {state.loading = false},
        updatePost: (state) => {state.loading = true},
        updatePostSuccess: (state, {payload}) => {
            state.posts = state.posts.map((post) => post.id === payload.id ? {...post,...payload} : post);
            state.loading = false;
        },
        updatePostFailure: (state) => {state.loading = false},

    }

})

export const {getAllPostsForAdmin,getAllPostsForUser, getAllPostsSuccess, getAllPostsFailure, deletePost, addPost, addPostSuccess, addPostFailure, updatePost, updatePostSuccess, updatePostFailure, 


} = postSlice.actions;

export default postSlice.reducer;