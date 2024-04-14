import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/home';
import ProductDetails from './components/product/productDetails'; 

function App() {

  const [isDark, setIsDark] = useState(false);


  return (
    <Router>
      
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        <Header
          isChecked={isDark}
          handleChange={()=> setIsDark(!isDark)}
        />

        <div className="container container-fluid">
        <Routes>
          <Route path="/" element={ <Home /> }  />
          <Route path="/search/:keyword" element={ <Home /> }  />
          <Route path='/product/:id' element={ <ProductDetails /> }  />
        </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
