import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Auth/PrivateRoute';

import QuizStart from '../components/QuizStart';
import QuizForm from '../components/QuizForm';
import QuizResults from '../components/QuizResults';
import LoginForm from '../components/LoginForm';
import NotFound from '../components/UI/NotFound';

function App() {
  const { questions } = useSelector(({ quiz }) => quiz);

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={QuizStart} />
        {Boolean(questions.length) && <PrivateRoute exact path="/quiz" component={QuizForm} />}
        <PrivateRoute exact path="/results" component={QuizResults} />
        <Route exact path="/login" component={LoginForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
