
import axios from 'axios';
import authService from './AuthService';


class AxiosService {
    
    axiosInstance = {};
    
    constructor(){
        this.initInstance();
    }

    initInstance(){
        this.axiosInstance = axios.create({
            baseURL: '/api/v1',
            timeout: 1000
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = authService.getToken();
                if(token){
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            });

        return this.axiosInstance;
        
    }


    getIntance(){
        return this.axiosInstance || this.initInstance();
    }
}

export default new AxiosService;