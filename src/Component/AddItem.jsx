import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddItemPage.css"; 
import NavBar from "./Navbar"; 

export default function AddItemPage() {
  const [value, setValue] = useState({
    name: "",
    price: "",
    details: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post request to add item to the backend
      const addItemResponse = await axios.post("http://localhost:5006/api/item", value);
      console.log(addItemResponse.data);

      // Reset input fields after successful submission
      setValue({
        name: "",
        price: "",
        details: "",
      });

      alert("Item added successfully!");
      navigate("/itemlist");
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while adding the item");
      }
    }
  };

  return (
    <div>
      <NavBar /> 
      <div className="add-item-container">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Item Name"
            onChange={handleChange}
            value={value.name}
            name="name"
            required
          />
          <input
            type="number"
            placeholder="Price"
            onChange={handleChange}
            value={value.price}
            name="price"
            required
          />
          <textarea
            placeholder="Details"
            value={value.details}
            onChange={handleChange}
            name="details"
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
}
