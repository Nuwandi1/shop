import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";

export default function AddOrderPage() {
  const [value, setValue] = useState({
    customerName: "",
    itemID: "",
    quantity: "",
    totalPrice: "",
    address: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  // Handle  submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const addOrderResponse = await axios.post("http://localhost:5006/api/orders", {
        customerName: value.customerName,
        itemID: value.itemID,
        quantity: value.quantity,
        totalPrice: value.totalPrice,
        address: value.address,
      });

      console.log(addOrderResponse.data);

      
      setValue({
        customerName: "",
        itemID: "",
        quantity: "",
        totalPrice: "",
        address: "",
      });

      alert("Order added successfully!");
      navigate("/show-orders"); 
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while adding the order.");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="add-order-container">
        <h2>Add New Order</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Customer Name"
            onChange={handleChange}
            value={value.customerName}
            name="customerName"
            required
          />
          <input
            placeholder="Item ID"
            onChange={handleChange}
            value={value.itemID}
            name="itemID"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            onChange={handleChange}
            value={value.quantity}
            name="quantity"
            required
          />
          <input
            type="number"
            placeholder="Total Price"
            onChange={handleChange}
            value={value.totalPrice}
            name="totalPrice"
            required
          />
          <textarea
            placeholder="Address"
            onChange={handleChange}
            value={value.address}
            name="address"
            required
          />
          <button type="submit">Add Order</button>
        </form>
      </div>
    </div>
  );
}
