import React from 'react';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const initialValues = { email: '', password: '', passwordConfirm: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirm is required'),
});

const NewUser = (props) => {
  const { error, onSubmit } = props;

  return (
    <div>
      <h1>Sign Up Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <Field type="password" name="passwordConfirm" />
            <ErrorMessage name="passwordConfirm" component="div" />
            <button type="submit" disabled={isSubmitting}>
              { isSubmitting ? 'Submitting...' : 'Submit' }
            </button>
          </Form>
        )}
      </Formik>
      {error && <div>{error}</div>}
    </div>
  );
};

NewUser.defaultProps = {
  error: '',
};

NewUser.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default NewUser;
