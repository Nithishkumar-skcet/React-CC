import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/data.json'; // Import the products data from your JSON file

const SearchPage = () => {
  const { searchTerm } = useParams(); // Get the search term from the URL
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch the products matching the search term from the data.json file
    const fetchSearchResults = () => {
      const filteredProducts = data.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by product name
      );
      setSearchResults(filteredProducts);
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <div className="product-row">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="prd-img" />
              <div className="product-details">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
