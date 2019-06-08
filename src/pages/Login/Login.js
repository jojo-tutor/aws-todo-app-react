// Render Prop
import React, { useState, useContext } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import SessionContext from '../../contexts/SessionContext';

const initialValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const Login = () => {
  const { setSession } = useContext(SessionContext);
  const [error, setError] = useState('');

  const handleSubmit = async ({ email, password }, { setSubmitting }) => {
    try {
      const { signInUserSession: session } = await Auth.signIn(email, password);
      setSession(session);
    } catch (e) {
      setError(e.message);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h1>Log In Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
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

export default Login;
