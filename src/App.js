import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes />
      </div>
    );
  }
}

export default App;
