import React, { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
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

          <div className="col-12 col-md-6 mt-2">
            <Routes>
              <Route path="*" element={<Search />} />
            </Routes>
          </div>



          <div className="col-12 col-md-3 col-sm-12 mt-4 mt-md-0 text-center">
            
            <i className="col-md-1 col-sm-1 col-1 fa-solid fa-moon fa-2xl mr-2" style={{ color: 'white', cursor: 'pointer' }}></i>
            
            <span id="cart" className="col-md-1 col-sm-1 col-1 ml-3">
            <i className=" fa-solid fa-cart-shopping fa-2xl" style={{ cursor: 'pointer' }}></i>
            <span className="ml-2" id="cart_count">
              2
            </span>
            </span>

            <button className="col-md-1 btn col-sm-1 col-1" id="login_btn">
              Login
          </button>

          </div>

        </nav>
      </Fragment>
    );
}





export default Header;