
import * as redux from 'redux';

import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

const reduces = redux.combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const init = () => {
    const store = createStore(reduces, composeEnhancers(applyMiddleware(thunk)));
    return store;

}
