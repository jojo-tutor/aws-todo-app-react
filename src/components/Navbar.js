import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';

const NavBar = (props) => {
  const { list } = props;
  return (
    <nav>
      <ul>
        {list.map((item) => {
          const { value, label, render } = item;
          return (
            <li key={value}>
              {render ? render(item) : <NavLink exact to={value} activeClassName="active">{label}</NavLink>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavBar;
