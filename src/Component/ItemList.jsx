import React, { useState, useEffect } from "react";
import axios from "axios";
import './ItemList.css';
import NavBar from "./Navbar";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemDetails, setItemDetails] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:5006/api/item");
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setError("Could not fetch items. Please try again.");
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleEditClick = (item) => {
        setEditItem(item._id);
        setItemName(item.name);
        setItemPrice(item.price);
        setItemDetails(item.details);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5006/api/item/${editItem}`, {
                name: itemName,
                price: itemPrice,
                details: itemDetails,
            });
            const response = await axios.get("http://localhost:5006/api/item");
            setItems(response.data);
            setEditItem(null);
            setItemName("");
            setItemPrice("");
            setItemDetails("");
        } catch (error) {
            console.error("Error updating item:", error);
            setError("Could not update item. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5006/api/item/${id}`);
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
            setError("Could not delete item. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="item-list">
                <h2>Item List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td>{editItem === item._id ? (
                                    <input 
                                        type="text" 
                                        value={itemName} 
                                        onChange={(e) => setItemName(e.target.value)} 
                                    />
                                ) : (
                                    item.name
                                )}</td>
                                <td>{editItem === item._id ? (
                                    <input 
                                        type="text" 
                                        value={itemPrice} 
                                        onChange={(e) => setItemPrice(e.target.value)} 
                                    />
                                ) : (
                                    `$${item.price}`
                                )}</td>
                                <td>{editItem === item._id ? (
                                    <input 
                                        type="text" 
                                        value={itemDetails} 
                                        onChange={(e) => setItemDetails(e.target.value)} 
                                    />
                                ) : (
                                    item.details
                                )}</td>
                                <td>
                                    {editItem === item._id ? (
                                        <button onClick={handleEditSubmit}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(item)}>Edit</button>
                                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;
