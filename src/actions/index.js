
import axios from 'axios';
import authService from 'services/AuthService';

import { FETCH_RENTAL_BY_ID_SUCCESS, 
          FETCH_RENTAL_BY_ID_INIT,
          FETCH_RENTALS_SUCCESS,
          LOGIN_SUCCESS,
          LOGIN_ERROR,
          LOGOUT} from './types';

//---------------Rental Actions----------------------------------

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental: rental
  }
}

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalsSuccess = (rentals) => {
  return{
    type: FETCH_RENTALS_SUCCESS,
    rentals: rentals
  }
}

export const fetchRentals = () => {
  return (dispatch) => {
    axios.get('/api/v1/rentals/')
    .then((res) => {return res.data})
    .then((rentals) => {
      dispatch(fetchRentalsSuccess(rentals))
    });
  }
}

export const fetchRentalById = (rentalId) => {

  return function(dispatch){

    dispatch(fetchRentalByIdInit());

    axios.get(`/api/v1/rentals/${rentalId}`)
    .then(res => res.data)
    .then((rental) =>  dispatch(fetchRentalByIdSuccess(rental))
    );
  

  }
}

export const register = (userData) => {
  
  return axios.post('/api/v1/users/register', {...userData}).then(
    (res) => {
      return res.data;
    },
    (err)=> {
      return Promise.reject(err.response.data.errors);
    });
}



//---------------Auth Actions----------------------------------


export const checkAuthState = () => {

  return dispatch => {
    if(authService.isAuthenticated()){
      dispatch(loginSuccess());
    }
  }
}

const loginSuccess = () => {

  return{
    type: 'LOGIN_SUCCESS'
  }
}
const loginFailure = (errors) => {
  return{
    type: LOGIN_ERROR,
    errors: errors
  }
}

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOGOUT
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', {...userData})
      .then(res => res.data)
      .then(token => {
        authService.saveToken();
        dispatch(loginSuccess());
      })
      .catch((error => {
        dispatch(loginFailure(error.response.data.errors));
      }))
  }
}