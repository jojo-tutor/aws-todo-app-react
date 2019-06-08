// Render Prop
import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';

const initialValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const Login = () => {
  const handleSubmit = async ({ email, password }, { setSubmitting }) => {
    try {
      await Auth.signIn(email, password);
      alert('Logged in');
    } catch (e) {
      alert(e.message);
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
