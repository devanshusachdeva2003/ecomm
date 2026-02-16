import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleViewProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct({ ...product, quantity: 1 });
  };

  const incrementQuantity = () => {
    setSelectedProduct(prevProduct => ({
      ...prevProduct,
      quantity: prevProduct.quantity + 1,
    }));
  };

  const decrementQuantity = () => {
    setSelectedProduct(prevProduct => ({
      ...prevProduct,
      quantity: prevProduct.quantity > 1 ? prevProduct.quantity - 1 : 1,
    }));
  };

  return (
    <div className={`App ${selectedProduct ? "single-product" : ""}`}>
      {selectedProduct ? (
        <div className="productid" key={selectedProduct.id}>
          <h2>{selectedProduct.title}</h2>
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title} 
            className="product-card" 
          />
          <p>{selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>

          <div className="quantity-controls">
            <button onClick={decrementQuantity}>-</button>
            <span>Quantity: {selectedProduct.quantity}</span>
            <button onClick={incrementQuantity}>+</button>
          </div>

          <button onClick={() => setSelectedProduct(null)}>Back to Product List</button>
        </div>
      ) : (
        <div className="product">
          {products.map(product => (
            <div className="productid" key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-card" 
              />
              <p>{product.description}</p>
              <button onClick={() => handleViewProduct(product.id)}>View</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

