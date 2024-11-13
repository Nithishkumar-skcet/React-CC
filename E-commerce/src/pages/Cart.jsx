import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css'; // Include CSS for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3003/products'); // Update URL to match your server
        setCartItems(response.data); // Assuming your API returns an array of cart items
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Function to handle removal of an item from the cart
  const handleRemove = (itemId) => {
    axios
      .delete(`http://localhost:3003/products/${itemId}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
        alert("Item removed from cart!");
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
        alert('Failed to remove item from cart.');
      });
  };
  

  const handleSaveForLater = (itemId) => {
    alert("Item saved for later!");
  };

  const handlePlaceOrder = (item) => {
    alert(`Order placed for ${item.name}, Quantity: ${item.quantity}, Total: ₹${item.price * item.quantity}`);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const deliveryCharges = totalAmount > 500 ? 0 : 40;

  return (
    <div className="cart-page">
      <div className="cart-content">
        <div className="cart-items-section">
          <h2>Your Cart</h2>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Seller: {item.seller}</p>
                <p>
                  <span className="original-price">₹{item.originalPrice}</span> ₹{item.price} ({item.discount}% off)
                </p>
                <p>Delivery by {item.deliveryDate} | ₹{item.deliveryCharge === 0 ? 'Free' : item.deliveryCharge}</p>
                <div className="quantity-selector">
                  <button>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button>+</button>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleSaveForLater(item.id)}>SAVE FOR LATER</button>
                  <button onClick={() => handleRemove(item.id)}>REMOVE</button>
                </div>
                <button 
                  className="place-order-button" 
                  onClick={() => handlePlaceOrder(item)}
                >
                  Place Order (₹{item.price * item.quantity})
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="price-summary-section">
          <h3>PRICE DETAILS</h3>
          <div className="price-detail">
            <p>Price ({cartItems.length} items)</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="price-detail">
            <p>Discount</p>
            <p>- ₹{totalDiscount}</p>
          </div>
          <div className="price-detail">
            <p>Delivery Charges</p>
            <p>₹{deliveryCharges}</p>
          </div>
          <div className="price-detail total-amount">
            <p>Total Amount</p>
            <p>₹{totalAmount - totalDiscount + deliveryCharges}</p>
          </div>
          <p className="you-save">You will save ₹{totalDiscount} on this order</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
