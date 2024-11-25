import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const apiUrl = "http://localhost:5000/product";

  // Fetch products from the backend
  useEffect(() => {
    axios.get(apiUrl)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new product
  const addProduct = () => {
    if (newProduct.trim()) {
      axios.post(apiUrl, { value: newProduct })
        .then((res) => setProducts([...products, res.data]))
        .catch((err) => console.error(err));
      setNewProduct("");
    }
  };

  // Edit an existing product
  const updateProduct = (id) => {
    axios.put(`${apiUrl}/${id}`, { value: editValue })
      .then((res) => {
        setProducts(
          products.map((product) =>
            product.id === id ? { ...product, value: res.data.value } : product
          )
        );
        setEditId(null);
        setEditValue("");
      })
      .catch((err) => console.error(err));
  };

  // Delete a product
  const deleteProduct = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => setProducts(products.filter((product) => product.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Product Management</h1>

      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="Add new product"
        />
        <button onClick={addProduct}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px" }}>
            {editId === product.id ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => updateProduct(product.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{product.value}</span>
                <button onClick={() => {
                  setEditId(product.id);
                  setEditValue(product.value);
                }}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;