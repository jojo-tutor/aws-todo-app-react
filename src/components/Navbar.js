import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, List, ListItem, NavigationDrawer, SVGIcon, Button,
} from 'react-md';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.scss';

const NavBar = (props) => {
  const { list } = props;

  return (
    <Paper zDepth={1}>
      <List inline className="navbar">
        {list.map((item) => {
          const { value, label, render } = item;
          return (
            <ListItem key={value} primaryText={label} className="navbar_item">
              {render ? render(item) : <NavLink exact to={value} activeClassName="active">{label}</NavLink>}
            </ListItem>
          );
        })}
      </List>
      {/* <nav>
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
      </nav> */}
    </Paper>

  );
};

NavBar.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavBar;
