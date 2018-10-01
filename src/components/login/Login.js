import React from 'react';
import LoginForm from './LoginForm';


export class Login extends React.Component{

    loginUser(userData){
        console.log(userData);
    }

    render(){
        return(
            <section id='login'>
            <div className='bwm-form'>
                <div className='row'>
                <div className='col-md-5'>
                    <h1>Login</h1>
                    <LoginForm submitCallback={this.loginUser} />
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