import React from "react";
import { useEffect, useState } from "react";
import "./SpotifyStats.css";
// import Header from "./Header";
import image from '../assets/tempProfilePicture.jpg';
import { auth } from "../firebase/firebase";
import { getUserData, updateUserData } from "../firebase/userData";
import { FaInstagram, FaSpotify } from 'react-icons/fa';

const ProfileSection = () => {
//   const [topMonth, setTopMonth] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Add a Name",
    bio: "Add a Bio",
    profilePicture: image,
    instagram: "Add an Instagram Username",
    spotifyName: "Add a Spotify Username"
  });

  useEffect(() => {
    // Fetch user profile data from Firebase
    const fetchProfileData = async () => {
      if (auth.currentUser) {
        const userData = await getUserData(auth.currentUser.uid);
        if (userData?.profile) {
          setProfileData(prev => ({
            ...prev,
            ...userData.profile
          }));
        }
      }
    };
    fetchProfileData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("handleSave called");
    console.log("Profile Data:", profileData);
    try {
      if (auth.currentUser) {
        await updateUserData(auth.currentUser.uid, {
          profile: profileData
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-section">
    <div className="profile-content">
        <img src={profileData.profilePicture} alt="Profile Picture" className="profile-image" />
        <div className="profile-text">
            <h1>{profileData.name}</h1>
            <p className="bio">{profileData.bio}</p>
            <div className="social-buttons">
                <p style={{marginTop: 10}}><strong>Social Accounts</strong></p>
                <button className="social-button"
                onClick={() => window.open(`https://www.instagram.com/${profileData.instagram}`, '_blank')}>
                  <FaInstagram class="icon" />
                  @{profileData.instagram}
                </button>
                <button className="social-button"
                onClick={() => window.open(`https://open.spotify.com/user/${profileData.spotifyName}`, '_blank')}>
                  <FaSpotify class="icon" />
                  on Spotify
                </button>
            </div>
            <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
        </div>

        {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Profile</h2>
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="Add a Name"
              />
              <div className="file-input-container">
                <label htmlFor="file-upload" className="file-input-label">
                  <strong>Upload Profile Picture</strong>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
              </div>
              <textarea style={{marginBottom: 20}}
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Add a Bio"
              />
              <p style={{marginBottom: 20, fontWeight: 'bold'}}> Edit Social Links </p>
              <input
                type="text"
                name="instagram"
                value={profileData.instagram}
                onChange={handleInputChange}
                placeholder="Add your Instagram Username"
              />
              <input
                type="text"
                name="spotifyName"
                value={profileData.spotifyName}
                onChange={handleInputChange}
                placeholder="Link your Spotify Username"
              />
              <div className="edit-buttons">
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

export default ProfileSection;