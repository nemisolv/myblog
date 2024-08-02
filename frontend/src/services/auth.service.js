import {  publicRequest } from "@/config/axiosConfig";

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

    static verifyEmail(token) {
        return publicRequest.get(`/auth/verify-email?token=${token}`);
    }

   
   
    
}