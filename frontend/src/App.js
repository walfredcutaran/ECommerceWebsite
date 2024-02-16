import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/home';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">
        <Routes>
          <Route path="/" element={ <Home /> } exact />
          <Route path="/product/:id" element={ <ProductDetails /> } exact />
        </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
