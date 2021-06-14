import axios from 'axios';

import * as actionTypes from './actionTypes';
import { SIGN_IN } from '../../constants/endpoints';

const authStart = () => ({ type: actionTypes.AUTH_START });

const authSuccess = (token, userId, expirationDate) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
  expirationDate,
});

const authFail = (error) => ({ type: actionTypes.AUTH_FAIL, error });

const checkAuthTimeout = (expiresIn) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expiresIn * 1000);
};

export const logout = () => ({ type: actionTypes.LOGOUT });

export const auth = (email, password, history) => (dispatch) => {
  dispatch(authStart());

  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  axios
    .post(SIGN_IN, authData)
    .then((res) => {
      const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000).toString();

      dispatch(authSuccess(res.data.idToken, res.data.localId, expirationDate));
      dispatch(checkAuthTimeout(res.data.expiresIn));
      history.push('/');
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};
