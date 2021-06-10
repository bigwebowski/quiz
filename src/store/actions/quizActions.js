import axios from 'axios';

import * as actionTypes from './actionTypes';

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

export const fetchQuestions = () => (dispatch) => {
  dispatch(questionsFetchStart());

  axios
    .get('https://opentdb.com/api.php?amount=2')
    .then((res) => dispatch(questionsFetchSuccess(res.data.results)))
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
