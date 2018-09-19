
import * as redux from 'redux';
import { rentalReducer, selectedRentalReducer } from './rental-reducer';

const reduces = redux.combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer
});

export const init = () => {
    const store = redux.createStore(reduces);
    return store;

}
