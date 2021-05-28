import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

/* eslint-disable react/jsx-props-no-spreading */

export const ProtectedRoute = ({ ...routeProps }: RouteProps): ReactElement => {
  const isAuthenticated = localStorage.getItem('auth-token');
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  }
  return <Redirect to={{ pathname: '/' }} />;
};
