import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import SessionContext from '../../contexts/SessionContext';
import NewForm from './components/NewForm';
import ConfirmationForm from './components/ConfirmationForm';

const Signup = (props) => {
  const { history } = props;
  const { setSession } = useContext(SessionContext);
  const [newUser, setNewUser] = useState(null);
  const [error, setError] = useState('');

  const resendSignUp = async ({ email, password }) => {
    try {
      const user = await Auth.resendSignUp(email);
      setNewUser({ ...user, email, password });
    } catch (e) {
      setError(e.message);
    }
  };
  const signUp = async ({ email, password }, { setSubmitting }) => {
    try {
      const user = await Auth.signUp({
        username: email,
        password,
      });
      setNewUser({ ...user, email, password });
    } catch ({ code, message }) {
      if (code === 'UsernameExistsException') {
        resendSignUp({ email, password });
      } else {
        setError(message);
      }
    }
    setSubmitting(false);
  };

  const confirm = async ({ confirmationCode }, { setSubmitting }) => {
    try {
      const { email, password } = newUser;
      await Auth.confirmSignUp(email, confirmationCode);
      const session = await Auth.signIn(email, password);
      setSession(session);
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
    setSubmitting(false);
  };

  const handleSubmit = (...args) => {
    setError('');
    if (newUser) {
      confirm(...args);
    } else {
      signUp(...args);
    }
  };

  return (
    <div>
      {newUser ? (
        <ConfirmationForm
          error={error}
          setNewUser={setNewUser}
          onSubmit={handleSubmit}
        />
      ) : (
        <NewForm
          error={error}
          history={history}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
