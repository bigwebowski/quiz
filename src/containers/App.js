import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

import QuizStart from '../components/QuizStart/QuizStart';
import QuizForm from '../components/QuizForm/QuizForm';
import QuizResults from '../components/QuizResults/QuizResults';
import LoginForm from '../components/LoginForm/LoginForm';

function App() {
  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={QuizStart} />
        <PrivateRoute exact path="/quiz" component={QuizForm} />
        <PrivateRoute exact path="/results" component={QuizResults} />
        <Route exact path="/login" render={(routerProps) => <LoginForm {...routerProps} />} />
      </div>
    </Router>
  );
}

export default App;
