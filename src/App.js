import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import SessionContext from './contexts/SessionContext';
import Header from './components/Header';
import Navbar from './components/Navbar';

import './styles/App.scss';

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
    <div className="mainApp">
      <Header />
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
              label: 'Log Out',
              render: () => <a href="#" onClick={handleLogout}>Log Out</a>, // eslint-disable-line
            },
          ]}
        />
      ) : (
        <Navbar
          list={[
            {
              value: '/new-cars',
              label: 'New Cars',
            },
            {
              value: '/used-cars',
              label: 'Used Cars',
            },
            {
              value: '/deals',
              label: 'Deals',
            },
            {
              value: '/insider',
              label: 'Insider',
            },
            {
              value: '/reviews',
              label: 'Reviews',
            },
            {
              value: '/recommendations',
              label: 'Recommendations',
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
