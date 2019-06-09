import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import SessionContext from './contexts/SessionContext';
import Navbar from './components/Navbar';

const App = () => {
  const [session, setSession] = useState(null);
  const getAuthentication = async () => {
    try {
      const currentSession = await Auth.currentSession();
      setSession(currentSession);
    } catch (e) {
      if (e !== 'No current user') {
        console.error(e);
      }
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    await Auth.signOut();
    setSession(null);
  };

  useEffect(() => {
    getAuthentication();
  }, []);

  const isAuthenticated = Boolean(session);
  const sessionProps = {
    session,
    isAuthenticated,
  };

  return (
    <div className="App container">
      {isAuthenticated ? (
        <Navbar
          list={[
            {
              value: '/',
              label: 'Home',
            },
            {
              value: '/about',
              label: 'About',
            },
            {
              value: '/contact',
              label: 'Contact',
            },
            {
              value: 'logout',
              render: () => <a href="#" onClick={handleLogout}>Log Out</a>,
            },
          ]}
        />
      ) : (
        <Navbar
          list={[
            {
              value: '/login',
              label: 'Log In',
            },
            {
              value: '/signup',
              label: 'Sign Up',
            },
          ]}
        />
      )}
      <SessionContext.Provider value={{ session, setSession }}>
        <Routes {...sessionProps} />
      </SessionContext.Provider>
    </div>
  );
};

export default App;
