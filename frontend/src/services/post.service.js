import { privateRequest } from "@/config/axiosConfig";

export default class PostService {
    static getAllPostsForAdmin(params) {
        return privateRequest.get('/posts/manage/all', { params });
    }

    static getAllPostsForUser(params) {
        return privateRequest.get('/posts', { params });
    }
    static addNewPost(data) {
        return privateRequest.post('/posts', data);
    }

    static deletePost(id) {
        return privateRequest.patch('posts/' + id + '/trashed/' + true);
    }
    static updatePost(id, data) {
        return privateRequest.put(`/posts/${id}`, data);
    }
}