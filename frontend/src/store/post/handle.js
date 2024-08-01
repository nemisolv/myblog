import PostService from "@/services/post.service";
import { call, put } from "redux-saga/effects";
import { addPostFailure, addPostSuccess, getAllPostsFailure, getAllPostsSuccess, updatePostFailure, updatePostSuccess } from "../slices/postSlice";
import { toast } from "react-toastify";

export function* handleGetAllPostsForAdmin({payload}) {
    try {
        const posts = yield call(PostService.getAllPostsForAdmin, payload);
        yield put(getAllPostsSuccess(posts));
    } catch (error) {
        console.log("🚀 ~ function*getAllPostsForAdmin ~ error:", error)
        yield put(getAllPostsFailure());
    }
} 

export function* handleGetAllPostsForUser({payload}) {
    try {
        const posts = yield call(PostService.getAllPostsForUser, payload);
        yield put(getAllPostsSuccess(posts));
    } catch (error) {
        console.log("🚀 ~ function*getAllPostsForUser ~ error:", error)
        yield put(getAllPostsFailure());
    }
}

export function* handleCreateNewPost({payload}) {
    try {
        const newPost = yield call(PostService.addNewPost, payload);
        yield put(addPostSuccess(newPost));
        toast.success("Post added successfully");
    } catch (error) {
        console.log("🚀 ~ function*createNewPost ~ error:", error)
        yield put(addPostFailure());
        toast.error("Failed to add post");
    }
}

export function* handleDeletePost({payload}) {
    try {
        yield call(PostService.deletePost, payload);
        toast.success("Post deleted successfully");
    } catch (error) {
        console.log("🚀 ~ function*deletePost ~ error:", error)
    }
}

export function* handleUpdatePost({payload}) {
    try {
        yield call(PostService.updatePost, payload.id, payload.data);
        yield put(updatePostSuccess(payload));
        toast.success("Post updated successfully");
    } catch (error) {
        console.log("🚀 ~ function*updatePost ~ error:", error)
        yield put(updatePostFailure());
    }
}