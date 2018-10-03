import React from 'react';
import RegisterForm from './RegisterForm';
import * as actions from 'actions'

import {Redirect} from 'react-router-dom';

export class Register extends React.Component{


    constructor(){
        super();

        this.state = {
            errors: [],
            redirect: false
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(userData){

        debugger;

        
        actions.register(userData).then(
            (registered) => {
                debugger;
                this.setState({
                    redirect: true
                })
            },
            (errors) => {
                debugger;
                this.setState({
                    errors: errors
                });
            });
    }

    render(){

        const {errors, redirect} = this.state;

        if(redirect){
            return <Redirect to={{pathname: '/login', state: {successRegistered: true }}} />
        }
        return(
            <section id='register'>
            <div className='bwm-form'>
                <div className='row'>
                <div className='col-md-5'>
                    <h1>Register</h1>
                    <RegisterForm submitCallback={this.registerUser} errors={errors} />
                </div>
                <div className='col-md-6 ml-auto'>
                    <div className='image-container'>
                    <h2 className='catchphrase'>As our member you have access to most awesome places in the world.</h2>
                    <img src='' alt=""/>
                    </div>
                </div>
                </div>
            </div>
            </section>

        );
    }

}