import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions, logout } from '../../store/actions';

import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

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
          <Button clicked={onFetchQuestions}>Start</Button>
          <Button clicked={onLogout}>Logout</Button>
        </div>
      )}
    </>
  );
}

export default QuizStart;
