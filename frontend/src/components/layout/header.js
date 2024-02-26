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
            
            <i className="fa-solid fa-moon fa-2xl mr-2" style={{ color: 'white', cursor: 'pointer' }}></i>
  
            <span id="cart" className="ml-3">
            <i className="fa-solid fa-cart-shopping fa-2xl" style={{ cursor: 'pointer' }}></i>
            </span>
            <span className="ml-2" id="cart_count">
              2
            </span>

            <button className="btn ml-5" id="login_btn">
              Login
          </button>
          </div>

        </nav>
      </Fragment>
    );
}

export default Header;