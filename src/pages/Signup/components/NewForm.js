import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Formik, Form,
} from 'formik';
import {
  Card, CardTitle, CardText, Button, Grid, Cell,
} from 'react-md';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import FieldError from '../../../components/FieldError';

const initialValues = { email: '', password: '', passwordConfirm: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirm is required'),
});

const NewForm = (props) => {
  const { error, history, onSubmit } = props;

  return (
    <Grid>
      <Cell size={6} desktopOffset={3} tabletOffset={1} phoneOffset={0}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Card>
                <CardTitle
                  title="Sign Up"
                  subtitle="Please fill-up the form to create new account"
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
                  <TextInput
                    required
                    type="password"
                    name="passwordConfirm"
                    label="Confirm your password"
                  />
                </CardText>
                <CardText>
                  <Button
                    flat
                    primary
                    swapTheming
                    type="submit"
                    disabled={isSubmitting}
                    className={cn('md-cell md-cell--2', isSubmitting && 'button-processing')}
                  >
                    Submit
                  </Button>
                  <Button
                    flat
                    swapTheming
                    disabled={isSubmitting}
                    iconBefore={false}
                    iconChildren="arrow_forward"
                    onClick={() => history.push('/login')}
                  >
                    Log In
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

NewForm.defaultProps = {
  error: '',
};

NewForm.propTypes = {
  error: PropTypes.string,
  history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewForm;
