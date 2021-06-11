import React from 'react';

import Button from '../UI/Button/Button';

function QuizStart({ fetchQuestions, logout }) {
  return (
    <div>
      <p>Welcome! Click the button to start the quiz</p>
      <Button clicked={fetchQuestions}>Start</Button>
      <Button clicked={logout}>Logout</Button>
    </div>
  );
}

export default QuizStart;
