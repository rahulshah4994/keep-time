import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/App.scss';

const Header = () => (
    <div>
      <h1>TimeKeep</h1>
      <NavLink activeClassName="active-page" exact to="/">Home</NavLink>
      <NavLink activeClassName="active-page" to="/login">Login Page</NavLink>
      <NavLink activeClassName="active-page" to="/analytics">Analytics</NavLink>
    </div>
  )

export default Header;