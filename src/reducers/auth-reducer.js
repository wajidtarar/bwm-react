
import { LOGIN_SUCCESS,
         LOGIN_ERROR} from '../actions/types';

const INITIAL_STATE = {
    isAuth: false,
    toke: '',
    errors: []
}


export const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.type){

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {isAuth: true, token: action.token, errors: []} );
        case LOGIN_ERROR:
            return Object.assign({}, state, {errors: action.errors} );

        default: 
            return state;
    }
}
