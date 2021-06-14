import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { connect } from 'react-redux';
import {
  fetchQuestions,
  acceptAnswer,
  setCurrentQuestion,
  stopTimer,
  auth,
  logout,
} from '../store/actions/';

import QuizStart from '../components/QuizStart/QuizStart';
import QuizForm from '../components/QuizForm/QuizForm';
import QuizResults from '../components/QuizResults/QuizResults';
import Spinner from '../components/UI/Spinner/Spinner';
import LoginForm from '../components/LoginForm/LoginForm';

function App(props) {
  const handleAnswerClick = (selectedAnswers) => {
    const correctAnswers = props.questions[props.currentQuestion].correct_answer;

    const scoreCoefficient =
      correctAnswers.length > selectedAnswers.length
        ? selectedAnswers.length / correctAnswers.length
        : 1;

    const singleQuestionScore = selectedAnswers
      .map((answer) => correctAnswers.includes(answer))
      .reduce((sum, el) => {
        el && (sum += (1 / selectedAnswers.length) * scoreCoefficient);
        return sum;
      }, 0);

    props.onAcceptAnswer(singleQuestionScore);
  };

  const handleNextQuestion = (resetForm) => {
    props.currentQuestion < props.questions.length - 1
      ? props.onSetCurrentQuestion()
      : props.onStopTimer();

    resetForm();
  };

  const submitAuth = ({ email, password }) => props.onAuth(email, password);

  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={QuizStart} />
        <PrivateRoute exact path="/quiz" component={QuizForm} />
        <PrivateRoute exact path="/results" component={QuizResults} />
        <Route
          exact
          path="/login"
          render={(routerProps) => <LoginForm onSubmit={submitAuth} {...routerProps} />}
        />
      </div>
    </Router>

    /*<>
      {!props.isSignedIn && <LoginForm onSubmit={submitAuth} />}
      {props.isSignedIn && (
        <>
          {props.isLoading && <Spinner />}
          {!props.isLoading && (
            <>
              {!props.quizStarted && <QuizStart fetchQuestions={props.onFetchQuestions} logout={props.onLogout} />}
              {props.quizStarted && !props.quizFinished && (
                <QuizForm
                  questions={props.questions}
                  handleAnswerClick={handleAnswerClick}
                  handleNextQuestion={handleNextQuestion}
                  currentQuestion={props.currentQuestion}
                  isAnswered={props.isAnswered}
                />
              )}
              {props.quizFinished && (
                <QuizResults
                  score={props.score}
                  quizLength={props.questions.length}
                  startTime={props.startTime}
                  finishTime={props.finishTime}
                />
              )}
            </>
          )}
        </>
      )}
    </>*/
  );
}

const mapStateToProps = (state) => ({
  questions: state.quiz.questions,
  currentQuestion: state.quiz.currentQuestion,
  score: state.quiz.score,
  quizStarted: state.quiz.isStarted,
  quizFinished: state.quiz.isFinished,
  isLoading: state.quiz.isLoading,
  isError: state.quiz.error,
  isAnswered: state.quiz.isAnswered,
  isSignedIn: Boolean(state.auth.token),
});

const mapDispatchToProps = (dispatch) => ({
  onFetchQuestions: () => dispatch(fetchQuestions()),
  onAcceptAnswer: (score) => dispatch(acceptAnswer(score)),
  onSetCurrentQuestion: () => dispatch(setCurrentQuestion()),
  onStopTimer: () => dispatch(stopTimer()),
  onAuth: (email, password) => dispatch(auth(email, password)),
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
