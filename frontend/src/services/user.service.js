import { privateRequest, publicRequest } from "../config/axiosConfig"
class UserService {
    static switchTFA = async(data) => {
        try {
           const res =  await privateRequest.patch('users/enable-tfa', data)
           return res
        }catch (e) {
        console.log("🚀 ~ UserService ~ switchTFA=async ~ e:", e)

        }
    }

    static updateProfile(data) {
        return privateRequest.put('/users/update-profile', data);
    }

    static getAllUsersForAdmin(params) {
        return privateRequest.get('/users/manage/all', { params });
    }
    static trashUser(data) {
        const { id, flag } = data;
        return privateRequest.patch(`users/${id}/trashed/${flag}`);
    }
}

export default UserService