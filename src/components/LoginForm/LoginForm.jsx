import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../store/actions';
import { useHistory } from 'react-router-dom';

import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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
          <Button type="submit">Log In</Button>
        </form>
      )}
    </>
  );
}

export default LoginForm;
