import React from 'react';
import { Button } from 'react-md';

import './Header.scss';

const Header = props => (
  <header>
    <h1>Cars</h1>
    <div className="buttons">
      <Button
        icon
        swapTheming
        iconChildren="search"
        onClick={() => {}}
      >
          Log In
      </Button>
      <Button
        flat
        swapTheming
        className="bordered"
        onClick={() => {}}
      >
          Log In
      </Button>
    </div>
  </header>
);

export default Header;
