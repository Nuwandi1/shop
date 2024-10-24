// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/login"; 
import Home from "./Component/Home"; 
import Profile from "./Component/Profile";
import AddItem from "./Component/AddItem";
import ItemList from "./Component/ItemList";
import AddOrderPage from "./Component/AddOrderPage";
import ShowOrders from "./Component/ShowOrders";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} /> {/* Add Home route */}
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/AddItem" element={<AddItem/>}/>     
          <Route path="/ItemList" element={<ItemList />} />
          <Route path="/AddOrderPage" element={<AddOrderPage />} />
          <Route path="/ShowOrders" element={<ShowOrders />} />
          {}
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}
