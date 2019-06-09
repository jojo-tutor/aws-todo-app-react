import React from 'react';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const initialValues = { confirmationCode: '' };
const validationSchema = Yup.object().shape({
  confirmationCode: Yup.string().required('Required'),
});

const Signup = (props) => {
  const { error, onSubmit } = props;

  return (
    <div>
      <h1>Confirmation Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="confirmationCode" />
            <ErrorMessage name="confirmationCode" component="div" />
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

Signup.defaultProps = {
  error: '',
};

Signup.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Signup;
