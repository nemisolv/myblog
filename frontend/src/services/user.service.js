const { axiosPrivate } = require("~/config/axiosConfig")

class UserService {
    static switchTFA = async(data) => {
        try {
           const res =  await axiosPrivate.patch('users/enable-tfa', data)
           return res.data
        }catch (e) {
        console.log("🚀 ~ UserService ~ switchTFA=async ~ e:", e)

        }
    }
}

export default UserService