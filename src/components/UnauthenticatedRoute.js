import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function querystring(name, url = window.location.href) {
  const cleanName = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp(`[?&]${cleanName}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const UnauthenticatedRoute = ({ component: Comp, props: cProps, ...rest }) => {
  const redirect = querystring('redirect');
  return (
    <Route
      {...rest}
      render={props => (!cProps.isAuthenticated
        ? <Comp {...props} {...cProps} />
        : (
          <Redirect
            to={redirect === '' || redirect === null ? '/' : redirect}
          />
        ))}
    />
  );
};

UnauthenticatedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  props: PropTypes.object.isRequired,
};

export default UnauthenticatedRoute;
