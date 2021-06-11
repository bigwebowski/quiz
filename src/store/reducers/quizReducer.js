import * as actionTypes from '../actions/actionTypes';
import shuffleArray from '../../helpers/shuffle';

const INITIAL_STATE = {
  questions: [],
  currentQuestion: 0,
  score: 0,
  timer: {
    isStarted: false,
    isFinished: false,
    startTime: null,
    finishTime: null,
  },
  isAnswered: false,
  isLoading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.QUESTIONS_FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.QUESTIONS_FETCH_SUCCESS:
      const questionsWithAnswersShuffled = action.questions.map((question) => {
        const shuffledAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer]);

        question.correct_answer = [question.correct_answer];
        return { ...question, all_answers: shuffledAnswers };
      });

      return {
        ...state,
        questions: questionsWithAnswersShuffled,
        isLoading: false,
        timer: {
          ...state.timer,
          isStarted: true,
          startTime: Date.now(),
        },
        error: false,
      };
    case actionTypes.QUESTIONS_FETCH_FAIL:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        isAnswered: false,
      };
    case actionTypes.ACCEPT_ANSWER:
      return {
        ...state,
        score: state.score + action.score,
        isAnswered: true,
      };
    case actionTypes.STOP_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          isFinished: true,
          finishTime: Date.now(),
        },
      };
    }
    case actionTypes.RESET_QUIZ:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
