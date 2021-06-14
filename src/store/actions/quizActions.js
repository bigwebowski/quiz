import axios from 'axios';

import * as actionTypes from './actionTypes';
import { QUESTIONS_DATA } from '../../constants/endpoints';

const questionsFetchStart = () => ({
  type: actionTypes.QUESTIONS_FETCH_START,
});

const questionsFetchSuccess = (questions) => ({
  type: actionTypes.QUESTIONS_FETCH_SUCCESS,
  questions,
});

const questionsFetchFail = (error) => ({
  type: actionTypes.QUESTIONS_FETCH_FAIL,
  error,
});

export const fetchQuestions = (history) => (dispatch) => {
  dispatch(questionsFetchStart());

  axios
    .get(QUESTIONS_DATA)
    .then((res) => {
      dispatch(questionsFetchSuccess(res.data.results));
      history.push('/quiz');
    })
    .catch((err) => dispatch(questionsFetchFail(err)));
};

export const setCurrentQuestion = () => ({
  type: actionTypes.SET_CURRENT_QUESTION,
});

export const acceptAnswer = (score) => ({
  type: actionTypes.ACCEPT_ANSWER,
  score,
});

export const resetQuiz = () => ({
  type: actionTypes.RESET_QUIZ,
});

export const stopTimer = () => ({
  type: actionTypes.STOP_TIMER,
});
