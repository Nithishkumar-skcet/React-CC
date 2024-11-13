import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productName } = useParams(); // Get product name from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3003/products');
        const products = response.data.products;

        // Find the product that matches the product name
        const foundProduct = products.find(item => 
          item.name.toLowerCase() === productName.toLowerCase()
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null); // Product not found
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>Price: {product.price}</p>
          <p>{product.description || 'No description available.'}</p>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
