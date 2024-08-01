import { call, put } from "redux-saga/effects";
import TagService from "@/services/tag.service";
import { addTagFailure, addTagSuccess, getAllTagsFailure, getAllTagsSuccess, updateTagFailure, updateTagSuccess } from "../slices/tagSlice";
import { toast } from "react-toastify";

export function* handleGetAllTags() {
    try {
        const tags = yield call(TagService.getAllTags);
        yield put(getAllTagsSuccess(tags));
    } catch (error) {
        console.log("🚀 ~ function*handleGetAllTags ~ error:", error)
        yield put(getAllTagsFailure());
    }
}

export function* handleAddTag({ payload }) {
    try {
        yield call(TagService.addTag, payload);
        yield put(addTagSuccess(payload));
        toast.success("Tag added successfully");
    } catch (error) {
        yield put(addTagFailure());
        console.log("🚀 ~ function*handleAddTag ~ error:", error)
        toast.error("Lilkely the tag already exists. Try another name");
    }
}

export function* handleUpdateTag({ payload }) {
    try {
        yield call(TagService.updateTag, payload);
        yield put(updateTagSuccess(payload));
        toast.success("Tag updated successfully");
    } catch (error) {
        yield put(updateTagFailure());
        console.log("🚀 ~ function*handleUpdateTag ~ error:", error)
    }
}

export function* handleDeleteTag({ payload }) {
    try {
        yield call(TagService.deleteTag, payload);
        toast.success("Tag deleted successfully");
    } catch (error) {
        console.log("🚀 ~ function*handleDeleteTag ~ error:", error)
    }
}