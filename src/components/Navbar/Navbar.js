import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const NavBar = (props) => {
  const { list } = props;

  return (
    <nav>
      {list.map((item) => {
        const { value, label, render } = item;
        return (
          <Fragment key={value}>
            {render ? render(item) : <NavLink exact to={value} activeClassName="active">{label}</NavLink>}
          </Fragment>
        );
      })}
    </nav>
  );
};

NavBar.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavBar;
