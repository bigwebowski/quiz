import './QuizForm.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { acceptAnswer, setCurrentQuestion, stopTimer } from '../../store/actions';
import { useHistory } from 'react-router-dom';

import Button from '../UI/Button';

function QuizForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const { questions, currentQuestion, isAnswered, score } = useSelector(({ quiz }) => quiz);

  console.log(currentQuestion);
  console.log(score);

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

    console.log(correctAnswers);
    console.log(selectedAnswers);

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
      <Button onClick={handleNextQuestion} disabled={!isAnswered}>
        Next Question
      </Button>
    </form>
  );
}

export default QuizForm;
