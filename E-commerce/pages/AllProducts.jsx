import React, { useState, useEffect } from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import data from '../data/data.json'; // Ensure this path is correct

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState({
    snacks: 0,
    staples: 0,
    beverages: 0,
    groceries: 0,
  });
  const itemsPerPage = 5;

  useEffect(() => {
    if (Array.isArray(data.products)) {
      setProducts(data.products); // Set products from the JSON file
    } else {
      console.error("Data is not an array:", data.products);
    }
  }, []);

  const getDisplayedItems = (category) => {
    const filteredItems = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    const totalItems = filteredItems.length;
    return Array.from({ length: itemsPerPage }, (_, i) => filteredItems[(categoryIndex[category] + i) % totalItems] || {});
  };

  // Add to Cart functionality using axios.post
  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:3003/products', {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1, // Add a default quantity if needed
      });
      console.log('Product added to cart:', response.data);
      alert(`${product.name} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart. Please try again.');
    }
  };

  const categories = ['groceries', 'snacks', 'staples', 'beverages'];

  return (
    <div className="main-container">
      {/* Categories */}
      {categories.map((category) => (
        <div key={category}>
          <div className="category-header">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
          <div className="product-row">
            {getDisplayedItems(category).map((item) => (
              item ? (
                <div className="product-card" key={item.id}>
                  <div className="product-discount">{item.discount}</div>
                  <img src={item.image} alt={item.name} className="prd-img" />
                  <div className="product-details">
                    <h4 className="product-name">{item.name}</h4>
                    <div className="product-price">
                      <span className="current-price">{item.price}</span>
                    </div>
                    <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
                      <FontAwesomeIcon icon={faCartArrowDown} />
                      Add to Cart
                    </button>
                    <button className="buy-now">
                      <FontAwesomeIcon icon={faShoppingBag} />
                      Buy Now
                    </button>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
