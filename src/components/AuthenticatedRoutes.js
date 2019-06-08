import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoutes = ({ component: Comp, props: cProps, ...rest }) => (
  <Route
    {...rest}
    render={props => (cProps.isAuthenticated
      ? <Comp {...props} {...cProps} />
      : (
        <Redirect
          to={`/login?redirect=${props.location.pathname}${props.location.search}`} // eslint-disable-line
        />
      ))}
  />
);

AuthenticatedRoutes.propTypes = {
  component: PropTypes.any.isRequired,
  props: PropTypes.object.isRequired,
};

export default AuthenticatedRoutes;
