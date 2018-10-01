
import React from 'react'
import { Field, reduxForm } from 'redux-form'

const LoginForm = props => {
  const { handleSubmit, pristine, submitting,
    submitCallback } = props
  return (
    <form onSubmit={handleSubmit(submitCallback)}>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            className="form-control"
          />
        </div>
      </div>

      <div>
        <label>Password</label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            className="form-control"
          />
        </div>
      </div>
 
      <div>
        <button className="btn btn-form btn-bwm" type="submit" disabled={pristine || submitting}>
          Login
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(LoginForm)
