import React from 'react';
import RegisterForm from './RegisterForm';
import * as actions from 'actions'

export class Register extends React.Component{


    constructor(){
        super();

        this.state = {
            errors: []
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(userData){
        actions.register(userData).then(
            (registered) => {
                debugger;
            },
            (errors) => {
                // debugger;
                this.setState({
                    errors: errors
                });
            });
    }

    render(){

        const {errors} = this.state;
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