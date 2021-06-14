import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../../store/actions';

import Button from '../UI/Button/Button';

function QuizResults({ history }) {
  const dispatch = useDispatch();

  const { score, questions, startTime, finishTime } = useSelector(({ quiz }) => quiz);

  const onQuizReset = () => {
    dispatch(resetQuiz());
    history.push('/');
  };

  const finalScore = Math.floor((score / questions.length) * 100);
  const totalTime = ((finishTime - startTime) / 1000).toFixed(2);
  const averageTime = (+totalTime / questions.length).toFixed(2);

  return (
    <div>
      <p>Your final score is {finalScore}% </p>
      <p>Total time is {totalTime} seconds</p>
      <p>Average answer time for each question is {averageTime} seconds</p>
      <Button clicked={onQuizReset}>Reset quiz</Button>
    </div>
  );
}

export default QuizResults;
