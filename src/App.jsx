import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(
      "https://e-com-lotus-backend-1.onrender.com/api/products"
    );
    setProducts(response.data);
  };

  const fetchCart = async () => {
    const response = await axios.get(
      "https://e-com-lotus-backend-1.onrender.com/api/cart"
    );
    setCart(response.data.cartItems);
    setTotalPrice(response.data.totalPrice);
    setDiscount(response.data.discount);
  };

  const addToCart = async (productId) => {
    await axios.post(
      "https://e-com-lotus-backend-1.onrender.com/api/cart/add",
      { productId, quantity: 1 }
    );
    fetchCart();
  };

  const removeFromCart = async (cartItemId) => {
    await axios.delete(
      `https://e-com-lotus-backend-1.onrender.com/api/cart/remove/${cartItemId}`
    );
    fetchCart();
  };

  return (
    <div className="App">
      <h1>E-Commerce Cart</h1>
      <div className="below-section">
        <div className="products">
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product._id} className="product">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product._id)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="cart">
          <h2>Cart</h2>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.productId.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <h3>Total Price: ₹{totalPrice}</h3>
          <h3>Discount: ₹{discount}</h3>
          <h3>Final Price: ₹{totalPrice - discount}</h3>
        </div>
      </div>
    </div>
  );
};

export default App;
