import React, { useState } from 'react';
import axios from 'axios'; 
import "./Profile.css";
import NavBar from "./Navbar"; 

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    shopName: 'Sports Shop',
    address: '456 Elm St, Colombo',
    contact: '011-2222222',
    email: 'sports_shop@gmail.com',
    description: 'Your one-stop shop for all sports equipment',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditMode(false);

    // Prepare profile data to send
    const profileData = {
      shopName: profile.shopName,
      address: profile.address,
      contact: profile.contact,
      email: profile.email,
      description: profile.description,
    };

    try {
      // Make a POST request to save profile data
      const response = await axios.post('http://localhost:5006/profile', profileData);
      console.log('Profile saved:', response.data);
    } catch (error) {
      console.error('Error saving profile', error);
    }
  };

  return (
    <div>
      <NavBar/> 
      <div className="profile-container"> 
        <h2>Shop Profile</h2>
        {editMode ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <label>
              Shop Name:
              <input
                type="text"
                name="shopName"
                value={profile.shopName}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Upload Shop Image:
              <input type="file" onChange={handleImageChange} />
            </label>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Shop" />
              </div>
            )}
            <button type="submit" className="save-btn">Save</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.shopName}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            {profile.image && (
              <div className="image-preview">
                <img src={imagePreview} alt="Shop" />
              </div>
            )}
            <button onClick={handleEditClick} className="edit-btn">Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
