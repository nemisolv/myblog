import { takeLatest } from "redux-saga/effects";
import { addTag, deleteTag, getAllTags, updateTag } from "../slices/tagSlice";
import { handleAddTag, handleDeleteTag, handleGetAllTags, handleUpdateTag } from "./handle";

export default function* tagSaga() {
    yield takeLatest(getAllTags.type, handleGetAllTags);
    yield takeLatest(addTag.type, handleAddTag);
    yield takeLatest(updateTag.type, handleUpdateTag);
    yield takeLatest(deleteTag.type, handleDeleteTag);

}