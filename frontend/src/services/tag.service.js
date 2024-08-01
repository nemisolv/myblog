import { privateRequest, publicRequest } from "@/config/axiosConfig";

export default class TagService {
    static getAllTags() {
        return publicRequest.get("/tags");
    }
    static addTag(tag) {
        return privateRequest.post("/tags", tag);
    }

    static updateTag(tag) {
        return privateRequest.put("/tags/" + tag.id, tag);
    }

    static deleteTag(id) {
        return privateRequest.delete("/tags/" + id);
    }
}