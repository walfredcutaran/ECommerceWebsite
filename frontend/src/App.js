import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <div class="container container-fluid">
        <Routes>
          <Route path="/" element={ <Home /> } exact />
        </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
