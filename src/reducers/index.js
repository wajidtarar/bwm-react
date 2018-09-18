
import * as redux from 'redux';
import { rentalReducer } from './rental-reducer';

const reduces = redux.combineReducers({
    rentals: rentalReducer
});

export const init = () => {
    const store = redux.createStore(reduces);
    return store;

}
