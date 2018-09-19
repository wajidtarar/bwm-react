
import * as redux from 'redux';
import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import thunk from 'redux-thunk';

const reduces = redux.combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer
});

export const init = () => {
    const store = redux.createStore(reduces, redux.applyMiddleware(thunk));
    return store;

}
