import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../../store/actions';
import { useHistory } from 'react-router-dom';

import Button from '../UI/Button';

function QuizResults() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { score, questions, startTime, finishTime } = useSelector(({ quiz }) => quiz);

  useLayoutEffect(() => {
    if (!startTime) {
      history.push('/');
    }
  }, [startTime, history]);

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
      <Button onClick={onQuizReset}>Reset quiz</Button>
    </div>
  );
}

export default QuizResults;
