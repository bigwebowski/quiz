import React from 'react';
import { Formik, Field, Form } from 'formik';
import './QuizForm.css';

import Button from '../UI/Button/Button';

function QuizForm({
  questions,
  handleAnswerClick,
  handleNextQuestion,
  currentQuestion,
  isAnswered,
}) {
  const { all_answers: allAnswers, correct_answer: correctAnswers } =
    questions[currentQuestion];

  const handleSelectAnswers = (values) => handleAnswerClick(values.checked);

  const checkBoxes = allAnswers.map((answer) => {
    const checkBoxStyle = correctAnswers.includes(answer)
      ? 'correct'
      : 'incorrect';

    return (
      <label key={answer} className={isAnswered ? checkBoxStyle : ''}>
        <Field
          type="checkbox"
          name="checked"
          value={answer}
          disabled={isAnswered}
        />
        {answer}
      </label>
    );
  });

  return (
    <div className="quiz-form">
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

            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="answers-container"
            >
              {checkBoxes}
            </div>

            <Button type="submit" disabled={isAnswered}>
              Answer
            </Button>
            <Button
              clicked={() => handleNextQuestion(resetForm)}
              disabled={!isAnswered}
            >
              Next Question
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default QuizForm;
