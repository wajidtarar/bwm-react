
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {BwmInput}  from 'components/shared/form/BwmInput';
import { minLength4, required } from 'components/shared/form/Validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting,
    submitCallback } = props
  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <Field
        name="email"
        component={BwmInput}
        label="Email"
        type="email"
        className="form-control"
        validate={[required, minLength4]}
        />

      <Field
        name="password"
        label="Password"
        component={BwmInput}
        type="password"
        className="form-control"
        validate={[required]}
        />
 
      <div>
        <button className="btn btn-form btn-bwm" type="submit" disabled={pristine || submitting}>
          Login
        </button>
      </div>
    </form>
  )
}


const validate = values => {

    const errors = {};

    if(!values.email){
        errors.email = 'email is required';
    }
    if(!values.password){
        errors.password = 'password is required';
    }
    return errors

  }

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)
