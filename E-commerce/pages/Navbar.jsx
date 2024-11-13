import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  // Search handler for redirecting to the search results page
  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search/${searchInput}`); // Redirect to search route with search term
    }
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__menu">
          <FontAwesomeIcon icon={faBars} aria-label="Menu" />
        </div>

        <div className="header__logo">
          <h1>Grocery</h1>
        </div>

        <div className="header__search">
          <input 
            type="text" 
            placeholder="Search My Basket" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)}
            className="header__searchInput"
          />
          <button className="header__searchButton" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className="header__actions">
          <Link to={'/cart'} className="header__cart">
            <div className="header__cartIcon">
              <FontAwesomeIcon icon={faShoppingCart} aria-label="Cart" />
            </div>
            <span className="header__cartText">Cart</span>
          </Link>
          <Link to={'/login'} className="header__login">
            <div className="header__loginIcon">
              <FontAwesomeIcon icon={faUser} aria-label="Login" />
            </div>
            <span className="header__loginText">Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
