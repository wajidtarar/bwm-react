
import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import authService from 'services/AuthService';


export function ProtectedRoute(props){

    const {component: Component, ...rest} = props;

    return(
        <Route {...rest} render={(props) => authService.isAuthenticated()
                                            ? <Component {...props} {...rest} /> 
                                            : <Redirect to={{pathname: '/login'}} />
                                }
        />
    )

}