
import * as redux from 'redux';

import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const reduces = redux.combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const init = () => {
    const store = createStore(reduces, composeEnhancers(applyMiddleware(thunk)));
    return store;

}
