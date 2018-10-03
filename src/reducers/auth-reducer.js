
import { LOGIN_SUCCESS,
         LOGIN_ERROR,
         LOGOUT} from '../actions/types';

const INITIAL_STATE = {
    isAuth: false,
    // toke: '',
    errors: []
}

export const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.type){

        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {isAuth: true, errors: []} );
        case LOGIN_ERROR:
            return Object.assign({}, state, {errors: action.errors} );
        case LOGOUT:
            return Object.assign({}, state, {isAuth: false})
        default: 
            return state;
    }
}
