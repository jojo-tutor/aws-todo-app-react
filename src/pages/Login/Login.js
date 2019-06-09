// Render Prop
import React, { useState, useContext } from 'react';
import cn from 'classnames';
import {
  Formik, Form,
} from 'formik';
import {
  Card, CardTitle, CardText, Button, Grid, Cell,
} from 'react-md';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
import SessionContext from '../../contexts/SessionContext';
import TextInput from '../../components/TextInput';
import FieldError from '../../components/FieldError';

const initialValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
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
    <Grid>
      <Cell size={6} desktopOffset={3} tabletOffset={1} phoneOffset={0}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Card>
                <CardTitle
                  title="Log In"
                  subtitle="Please enter your email and password"
                />
                <CardText>
                  <TextInput
                    required
                    type="email"
                    name="email"
                    label="Enter your email"
                  />
                  <TextInput
                    required
                    type="password"
                    name="password"
                    label="Enter your password"
                  />
                </CardText>
                <CardText>
                  <Button
                    flat
                    primary
                    swapTheming
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(isSubmitting && 'button-processing')}
                  >
                    Submit
                  </Button>
                </CardText>
                <FieldError error={error} />
              </Card>
            </Form>
          )}
        </Formik>
      </Cell>
    </Grid>
  );
};

export default Login;
