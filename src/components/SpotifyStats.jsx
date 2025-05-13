import React from "react";
import { useEffect, useState } from "react";
import "./SpotifyStats.css";
import Header from "./Header";
import image from '../assets/tempProfilePicture.jpg';
import { auth } from "../firebase/firebase";
import { getUserData, updateUserData } from "../firebase/userData";

const SpotifyStats = ({ topArtists, topTracks }) => {
  const [topMonth, setTopMonth] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Add a Name",
    bio: "Add a Bio",
    profilePicture: image,
    instagram: "Add an Instagram Username",
    spotifyName: "Add a Spotify Username"
  });

  useEffect(() => {
    const fetchedAt = new Date();
    const approxStart = new Date(fetchedAt);
    approxStart.setDate(fetchedAt.getDate() - 28); //subtract 28 days for around 4 weeks ago
    const monthName = approxStart.toLocaleString("default", { month: "long" }); //get month name
    setTopMonth(monthName);

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
    <div className="spotify-container">
      <div className="stats-section">
        {/* Stats Grid */}
        <h1>In the Last Month...</h1>
        <div className="stats-grid">
          {/* Top Artists */}
          <div className="top-artists">
            <h2>Top Artists</h2>
            <div className="artist-grid">
              {topArtists.map((artist) => (
                <div key={artist.id} className="artist-item">
                  <img src={artist.images[0]?.url} alt={artist.name} />
                  <p>{artist.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Songs */}
          <div className="top-songs">
            <h2>Top Songs</h2>
            {topTracks.map((track) => (
              <div key={track.id} className="song-item">
                <img src={track.album.images[0]?.url} alt={track.name} />
                <div className="song-info">
                  <p className="name">{track.name}</p>
                  <p className="album">{track.album.name}</p>
                  <p className="artist">{track.artists[0].name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyStats;