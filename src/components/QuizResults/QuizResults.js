import React from 'react';
import { connect } from 'react-redux';
import { resetQuiz } from '../../store/actions/quizActions';

import Button from '../UI/Button/Button';

function QuizResults(props) {
  const finalScore = Math.floor((props.score / props.quizLength) * 100);
  const totalTime = ((props.finishTime - props.startTime) / 1000).toFixed(2);
  const averageTime = (+totalTime / props.quizLength).toFixed(2);

  return (
    <div>
      <p>Your final score is {finalScore}% </p>
      <p>Total time is {totalTime} seconds</p>
      <p>Average answer time for each question is {averageTime} seconds</p>
      <Button clicked={props.onResetQuiz}>Reset quiz</Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onResetQuiz: () => dispatch(resetQuiz()),
});

export default connect(null, mapDispatchToProps)(QuizResults);
