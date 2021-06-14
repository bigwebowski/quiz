import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions, logout } from '../../store/actions';

import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

function QuizStart({ history }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(({ quiz }) => quiz);

  const onFetchQuestions = () => dispatch(fetchQuestions(history));
  const onLogout = () => dispatch(logout());

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div>
          <p>Welcome! Click the button to start the quiz</p>
          <Button onClick={onFetchQuestions}>Start</Button>
          <Button onClick={onLogout}>Logout</Button>
        </div>
      )}
    </>
  );
}

export default QuizStart;
