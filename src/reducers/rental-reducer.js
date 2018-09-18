
import { FETCH_RENTALS } from '../actions/types';

const INITIAL_STATE = {
  data: []
}


export const rentalReducer = (state = INITIAL_STATE, action) => {

  debugger;
  switch (action.type){

      case FETCH_RENTALS:
        return { ...state, data: action.rentals}
      default: 
          return state;
    }
}