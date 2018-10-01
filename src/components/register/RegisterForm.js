
import React from 'react'
import { Field, reduxForm } from 'redux-form'


const renderField = ({
    input,
    label,
    type,
    className,
    meta: { touched, error, warning }
  }) => (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group   '>
        <input {...input} type={type} className={className} />

      </div>
        {touched &&
          ((error && <div className='alert alert-danger'>{error}</div>))}
    </div>
  )

  
const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitCallback } = props
  return (
    <form onSubmit={handleSubmit(submitCallback)}>
        <Field
        name="username"
        component="input"
        type="text"
        placeholder="User Name"
        label="User Name"
        className="form-control"
        component= {renderField}
        />
        <Field
        name="email"
        component="input"
        type="email"
        label="Email"
        className="form-control"
        component= {renderField}
        />
        <Field
        name="password"
        component="input"
        type="password"
        label="Password"
        className="form-control"
        component= {renderField}
        />
        <Field
        name="passwordConfirmation"
        component="input"
        type="password"
        label="Password Confirmation"
        className="form-control"
        component= {renderField}
        />
 
        <button className="btn btn-bwm btn-form" type="submit" disabled={pristine || submitting}>
          Submit
        </button>
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
    if(values.password != values.passwordConfirmation){
        errors.passwordConfirmation = 'password and confirm password  do not match';
    }

    return errors

  }

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)