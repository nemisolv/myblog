import { takeLatest } from "redux-saga/effects";
import {  handleCreateNewPost, handleDeletePost, handleGetAllPostsForAdmin, handleGetAllPostsForUser, handleUpdatePost } from "./handle";
import { addPost, deletePost, getAllPostsForAdmin, getAllPostsForUser, updatePost } from "../slices/postSlice";

export default function* postSaga() {
    yield takeLatest(getAllPostsForAdmin.type, handleGetAllPostsForAdmin);
    yield takeLatest(getAllPostsForUser.type, handleGetAllPostsForUser);
    yield takeLatest(addPost.type, handleCreateNewPost);
    yield takeLatest(updatePost.type, handleUpdatePost);
    yield takeLatest(deletePost.type, handleDeletePost);

    
}