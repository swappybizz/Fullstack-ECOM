import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hardcoded Backend URL
  const backendURL = "http://localhost:5000";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendURL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  // Place order
  const placeOrder = async (productId) => {
    try {
      const response = await axios.post(`${backendURL}/orders`, {
        productId,
        quantity: 1,
        user: "John Doe",
      });
      setOrderMessage(response.data.message);
      setSelectedProduct(null);
      setErrorMessage(""); // Clear any existing errors
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple E-Commerce App</h1>

      {/* Display success or error messages */}
      {orderMessage && <p style={{ color: "green" }}>{orderMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Display product list */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid black",
                padding: "10px",
                width: "200px",
              }}
            >
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button onClick={() => setSelectedProduct(product)}>
                Buy Now
              </button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {/* Display order confirmation modal */}
      {selectedProduct && (
        <div style={{ marginTop: "20px" }}>
          <h2>Confirm Order for {selectedProduct.name}</h2>
          <button onClick={() => placeOrder(selectedProduct._id)}>
            Place Order
          </button>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
