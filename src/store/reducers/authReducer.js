import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
  token: localStorage.getItem('token') || null,
  userId: null,
  isLoading: false,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      localStorage.setItem('token', action.token);
      localStorage.setItem('expirationDate', action.expirationDate);
      localStorage.setItem('userId', action.userId);

      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        isLoading: false,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('userId');

      return {
        ...state,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
