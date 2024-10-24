import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import "./ShowOrders.css";

export default function ShowOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5006/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleConfirm = (index) => {
    alert(`Order for ${orders[index].customerName} confirmed!`);

    // Update the order's confirmed status to true
    const updatedOrders = [...orders];
    updatedOrders[index].confirmed = true; 
    setOrders(updatedOrders);
  };

  return (
    <div>
      <NavBar />
      <h2>Show Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Item ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: order.confirmed ? "#ffcccb" : "white", // Change row color to pink when confirmed
              }}
            >
              <td>{order.customerName}</td>
              <td>{order.itemID}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.address}</td>
              <td>
                <button onClick={() => handleConfirm(index)} disabled={order.confirmed}>
                  {order.confirmed ? "Confirmed" : "Confirm"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
