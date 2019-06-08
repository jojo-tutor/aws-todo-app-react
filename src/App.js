import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import SessionContext from './contexts/SessionContext';

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
  const handleLogout = async () => {
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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}

      <SessionContext.Provider value={{ session, setSession }}>
        <Routes {...sessionProps} />
      </SessionContext.Provider>
    </div>
  );
};

export default App;
