import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom'
import '../../App.css';
import Search from './searchFunction'
import logoImage from '../../images/mylogo.png'

const Header = () => {
    return (
      <Fragment>
        <nav className="navbar row">
          <div className="col-12 col-md-3">
            <div className="navbar-brand logo ml-3">
            <a href='/'>
            <img 
                src={logoImage}
                alt="logo" 
                width="100px"
                height="60px"
                />
            </a>

            </div>
          </div>

          <div className="col-12 col-md-6 mt-2 mt-md-0">
            <Routes>
              <Route path="*" element={<Search />} />
            </Routes>
          </div>

          <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
            <button className="btn" id="login_btn">
              Login
            </button>

            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              2
            </span>
          </div>
        </nav>
      </Fragment>
    );
}

export default Header;