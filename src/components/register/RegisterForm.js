
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {BwmInput}  from 'components/shared/form/BwmInput';
import {BwmResError}  from 'components/shared/form/BwmResError';


const RegisterForm = props => {

  const { handleSubmit, pristine, 
    submitting, submitCallback, valid, errors } = props

  return (
    <form onSubmit={handleSubmit(submitCallback)}>
        <Field
        name="username"
        type="text"
        placeholder="User Name"
        label="User Name"
        className="form-control"
        component= {BwmInput}
        />
        <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component= {BwmInput}
        />
        <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component= {BwmInput}
        />
        <Field
        name="passwordConfirmation"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component= {BwmInput}
        />
 
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Register
        </button>

        <BwmResError errors={errors} />

    </form>
  )
}

const validate = values => {

    const errors = {};

    if(values.username && values.username.length < 4){
        errors.username = 'user name should be more than 4 chars';
    }

    if(!values.email){
        errors.email = 'email is requireds';
    }
    if(!values.password){
        errors.password = 'password is requireds';
    }
    if(values.password !== values.passwordConfirmation){
        errors.passwordConfirmation = 'password and confirm password  do not match';
    }

    return errors

  }

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)