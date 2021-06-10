import React from 'react';

import { connect } from 'react-redux';
import {
  fetchQuestions,
  acceptAnswer,
  setCurrentQuestion,
  stopTimer,
} from './store/actions/quizActions';

import QuizStart from './components/QuizStart/QuizStart';
import QuizForm from './components/QuizForm/QuizForm';
import QuizResults from './components/QuizResults/QuizResults';
import Spinner from './components/UI/Spinner/Spinner';

function App(props) {
  const handleAnswerClick = (selectedAnswers) => {
    const correctAnswers =
      props.questions[props.currentQuestion].correct_answer;

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

  return (
    <div className="container">
      {props.isLoading && <Spinner />}
      {!props.isLoading && (
        <>
          {!props.quizStarted && (
            <QuizStart handleQuizStart={props.onFetchQuestions} />
          )}
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion,
  score: state.score,
  quizStarted: state.timer.isStarted,
  quizFinished: state.timer.isFinished,
  startTime: state.timer.startTime,
  finishTime: state.timer.finishTime,
  isLoading: state.isLoading,
  isError: state.error,
  isAnswered: state.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchQuestions: () => dispatch(fetchQuestions()),
  onAcceptAnswer: (score) => dispatch(acceptAnswer(score)),
  onSetCurrentQuestion: () => dispatch(setCurrentQuestion()),
  onStopTimer: () => dispatch(stopTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
