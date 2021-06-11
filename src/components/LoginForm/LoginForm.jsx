import React from 'react';

import { Field, reduxForm } from 'redux-form';

function LoginForm(props) {
  const { handleSubmit, pristine, reset, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="Email" />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field name="password" component="input" type="password" placeholder="Password" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Sign In
        </button>
      </div>
    </form>
  );
}

export default reduxForm({ form: 'auth' })(LoginForm);
