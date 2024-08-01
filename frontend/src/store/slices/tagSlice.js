import {createSlice} from '@reduxjs/toolkit';

const tagSlice = createSlice({
    name: 'tag',
    initialState: {
        tags: [],
        loading: false,
    },
    reducers: {
        getAllTags: (state) => {state.loading = true},
        getAllTagsSuccess: (state, {payload}) => {
            state.tags = payload;
            state.loading = false;
        },
        getAllTagsFailure: (state) => {state.loading = false},
        deleteTag: (state, {payload}) => {
            state.tags = state.tags.filter((tag) => tag.id !== payload);
        },

        updateTag: (state) => {
            state.loading = true;
        },
        updateTagSuccess: (state, {payload}) => {
            state.loading = false;
            state.tags = state.tags.map((tag) =>
                tag.id === payload.id ? payload : tag,
            );
        },
        updateTagFailure: (state) => {
            state.loading = false;
        },

        addTag: (state) => {
            state.loading = true;
        },
        addTagSuccess: (state, {payload}) => {
            state.loading = false;
            state.tags.push(payload);
        },
        addTagFailure: (state) => {
            state.loading = false;
        },
    }
})

export const {getAllTags, getAllTagsSuccess, getAllTagsFailure, deleteTag, updateTag, updateTagSuccess, updateTagFailure, addTag, addTagSuccess, addTagFailure} = tagSlice.actions;

export default tagSlice.reducer;