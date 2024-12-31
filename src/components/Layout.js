import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../App.css';

const Layout = () => {
  return (
    <>
      <header>
        <h1>OSD Events Listings</h1>
        <nav className="top-nav">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
