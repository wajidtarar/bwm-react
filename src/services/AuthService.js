
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

 class AuthService {

    getToken(){
        return localStorage.getItem('auth_token');
    }

    saveToken(token){
        return localStorage.setItem('auth_token', token);
    }

    invalidateUser(){
        return localStorage.removeItem('auth_token');
    }

    decode(token){
        return  jwt.decode(token);
    }

    getExpiration(token){
        debugger;
        return moment.unix(this.decode(token).exp);
    }

    isValid(token){
        return moment().isBefore(this.getExpiration(token));
    }

    isAuthenticated(){
        const token = this.getToken();
        if(token && this.isValid(token)){
            return true;
        }  else{
            return false;
        }
    }
}

export default new AuthService();