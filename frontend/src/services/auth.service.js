import { privateRequest, publicRequest } from "@/config/axiosConfig";

export default class AuthService {
    static login(data) {
        return publicRequest.post('/auth/login', data);
    }
    static register(data) {
        return publicRequest.post('/auth/register', data);
    }
    static verifyTFA(data) {
        return publicRequest.post('/auth/verify-tfa', data);
    }

   
   
    
}