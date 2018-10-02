
import axios from 'axios';

import { FETCH_RENTAL_BY_ID_SUCCESS, 
          FETCH_RENTAL_BY_ID_INIT,
          FETCH_RENTALS_SUCCESS,
          LOGIN_SUCCESS,
          LOGIN_ERROR} from './types';

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
const loginSuccess = (token) => {
  return{
    type: LOGIN_SUCCESS,
    token
  }
}
const loginFailure = (errors) => {
  return{
    type: LOGIN_ERROR,
    errors: errors
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
      debugger;
      return res.data;
    },
    (err)=> {
      debugger;
      return Promise.reject(err.response.data.errors);
    });
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', {...userData})
      .then(res => res.data)
      .then(token => {
        debugger;
        localStorage.setItem('token_auth', token);
        dispatch(loginSuccess(token));
      })
      .catch((error => {
        debugger;
        dispatch(loginFailure(error.response.data.errors));
      }))
  }
}