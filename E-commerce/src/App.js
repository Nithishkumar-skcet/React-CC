import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Order from './pages/Order';
import Cart from './pages/Cart';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';
import NoPage from './pages/NoPage';
import Login from './components/Login1';
import Signup1 from './components/Signup1';
import Forgot from './pages/Forgot';
import SearchPage from './pages/SearchPage'; // Import SearchPage

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:productName" element={<ProductPage />} />
          <Route path="/signup" element={<Signup1 />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/search/:searchTerm" element={<SearchPage />} /> {/* Search Route */}
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
