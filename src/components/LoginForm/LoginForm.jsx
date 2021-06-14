import React from 'react';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../store/actions';

import Spinner from '../UI/Spinner/Spinner';

function LoginForm({ history }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(({ auth }) => auth);
  const { register, handleSubmit } = useForm();

  const handleLogin = ({ email, password }) => dispatch(auth(email, password, history));

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form onSubmit={handleSubmit(handleLogin)}>
          <input type="text" placeholder="Email" {...register('email')} />
          <input type="password" placeholder="Password" {...register('password')} />
          <button type="submit">Log In</button>
        </form>
      )}
    </>
  );
}

export default LoginForm;
