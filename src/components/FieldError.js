import React from 'react';
import PropTypes from 'prop-types';

const FieldError = ({ error }) => error && (
  <div className="md-grid">
    {error && <p className="md-cell md-cell--12 md-text--error">{error}</p>}
  </div>
);

FieldError.defaultProps = {
  error: '',

};

FieldError.propTypes = {
  error: PropTypes.string,
};

export default FieldError;
