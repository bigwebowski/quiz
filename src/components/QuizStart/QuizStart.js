import React from 'react';
import Button from '../UI/Button/Button';

function QuizStart(props) {
  return (
    <div>
      <p>Welcome! Click the button to start the quiz</p>
      <Button clicked={props.handleQuizStart}>Start</Button>
    </div>
  );
}

export default QuizStart;
