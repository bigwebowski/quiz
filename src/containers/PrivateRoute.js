import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const isSignedIn = useSelector(({ auth }) => Boolean(auth.token));

  return (
    <Route
      {...rest}
      render={(routeProps) => (isSignedIn ? <RouteComponent {...routeProps} {...rest} /> : <Redirect to={'/login'} />)}
    />
  );
};

export default PrivateRoute;
