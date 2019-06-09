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

const initialValues = { confirmationCode: '' };
const validationSchema = Yup.object().shape({
  confirmationCode: Yup.string().required('Confirmation code is required'),
});

const ConfirmationForm = (props) => {
  const { error, setNewUser, onSubmit } = props;

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
                  title="Confirm Code"
                  subtitle="Please enter your confirmation code"
                />
                <CardText>
                  <TextInput
                    required
                    type="text"
                    name="confirmationCode"
                    label="Enter confirmation code"
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
                    iconChildren="close"
                    onClick={() => setNewUser(null)}
                  >
                    Cancel
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

ConfirmationForm.defaultProps = {
  error: '',
};

ConfirmationForm.propTypes = {
  error: PropTypes.string,
  setNewUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmationForm;
