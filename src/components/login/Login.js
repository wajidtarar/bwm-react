import React from 'react';
import LoginForm from './LoginForm';
import * as actions from 'actions';
import {Redirect} from 'react-router-dom';

export class Login extends React.Component{

    constructor(){
        super();
        this.loginUser = this.loginUser.bind(this);

        this.state = {
            errors:[],
            token:'',
            redirect: false
        }
    }

    loginUser(userData){
        actions.login(userData).then(
            (res) => {
                this.setState({
                    token: res,
                    redirect: true
                });
            },
            (err) => {
                this.setState({
                    errors: err
                });
            }
        );
    }

    render(){

        const {errors, redirect} = this.state;
        debugger;
        if(redirect){
            return <Redirect to={{pathname: '/rentals', state: {loginSuccess: true} }} />
        }

        return(
            <section id='login'>
            <div className='bwm-form'>
                <div className='row'>
                <div className='col-md-5'>
                    <h1>Login</h1>
                    <LoginForm submitCallback={this.loginUser} errors={errors} />
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