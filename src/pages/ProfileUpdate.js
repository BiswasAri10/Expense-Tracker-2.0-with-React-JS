import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../auth-store/AuthContext";
import "./ProfileUpdate.css";

const UpdateProfile = () => {
  const authCtx = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const navigate = useNavigate();

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleProfilePhotoChange = (event) => {
    setProfilePhotoURL(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (authCtx.isLoggedIn) {
      const idToken = authCtx.token;

      const requestData = {
        idToken: idToken,
        displayName: fullName,
        photoUrl: profilePhotoURL,
      };

      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCR645Usau9CFI7QsbvX-fL7iehx-P4xU8`,
          JSON.stringify(requestData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Profile updated successfully:", response.data);
        authCtx.setProfileComplete(true);
        setFullName("");
        setProfilePhotoURL("");
        alert("Profile updated successfully!");
        navigate("/home");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="profile-update-container">
      <h1>Update Your Profile</h1>
      <form onSubmit={handleSubmit} className="profile-update-form">
        <div className="input-container">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="profilePhotoURL">Profile Photo URL:</label>
          <input
            type="text"
            id="profilePhotoURL"
            value={profilePhotoURL}
            onChange={handleProfilePhotoChange}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="update-button">
            Update Profile
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
