import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
} from 'formik';
import {
  TextField,
} from 'react-md';

const TextInput = (props) => {
  const {
    label, required, type, ...inputProps
  } = props;
  return (
    <Field
      {...inputProps}
      render={({ field, form: { touched, errors } }) => {
        const { name, onChange } = field;
        const error = touched[field.name] && errors[field.name];
        return (
          <TextField
            {...field}
            id={name}
            type={type}
            label={label}
            required={required}
            error={Boolean(error)}
            errorText={error}
            onChange={(value, e) => onChange(e)}
          />
        );
      }}
    />
  );
};

TextInput.defaultProps = {
  label: '',
  type: '',
  required: false,

};

TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default TextInput;
