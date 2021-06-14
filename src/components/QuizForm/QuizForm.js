import React from 'react';
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { acceptAnswer, setCurrentQuestion, stopTimer } from '../../store/actions';

import './QuizForm.css';

import Button from '../UI/Button/Button';

function QuizForm({ history }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const { questions, currentQuestion, isAnswered } = useSelector(({ quiz }) => quiz);
  const { all_answers: allAnswers, correct_answer: correctAnswers } = questions[currentQuestion];

  const onSetCurrentQuestion = () => dispatch(setCurrentQuestion());
  const onStopTimer = () => dispatch(stopTimer());
  const onAcceptAnswer = (score) => dispatch(acceptAnswer(score));

  const handleAnswerSubmit = ({ answer: selectedAnswers }) => {
    const correctAnswers = questions[currentQuestion].correct_answer;

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

    onAcceptAnswer(singleQuestionScore);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      onSetCurrentQuestion();
    } else {
      onStopTimer();
      history.push('/results');
    }
  };

  const checkBoxes = allAnswers.map((answer) => {
    const checkBoxStyle = correctAnswers.includes(answer) ? 'correct' : 'incorrect';

    return (
      <label key={answer} className={isAnswered ? checkBoxStyle : ''}>
        <input type="checkbox" {...register('answer')} value={answer} disabled={isAnswered} />
        {answer}
      </label>
    );
  });

  return (
    <form onSubmit={handleSubmit(handleAnswerSubmit)}>
      <h3>{questions[currentQuestion].question}</h3>
      {checkBoxes}
      <Button type="submit" disabled={isAnswered}>
        Answer
      </Button>
      <Button clicked={handleNextQuestion} disabled={!isAnswered}>
        Next Question
      </Button>
    </form>

    /*<div className="quiz-form">
      <Formik
        initialValues={{
          checked: [],
        }}
        onSubmit={(values) => handleSelectAnswers(values)}
        enableReinitialize
      >
        {({ values, resetForm }) => (
          <Form>
            <h3>{questions[currentQuestion].question}</h3>
            <div role="group" aria-labelledby="checkbox-group" className="answers-container">
              {checkBoxes}
            </div>
            <Button type="submit" disabled={isAnswered}>
              Answer
            </Button>
            <Button clicked={() => handleNextQuestion(resetForm)} disabled={!isAnswered}>
              Next Question
            </Button>
          </Form>
        )}
      </Formik>
    </div>*/
  );
}

export default QuizForm;
