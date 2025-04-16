

import React from "react";
import { useEffect, useState } from "react";
import "./SpotifyStats.css"; // This links to your CSS file

const SpotifyStats = ({ topArtists, topTracks }) => {
  const [topMonth, setTopMonth] = useState("");

  useEffect(() => {
    const fetchedAt = new Date();

    // Subtract ~28 days to approximate 4 weeks ago
    const approxStart = new Date(fetchedAt);
    approxStart.setDate(fetchedAt.getDate() - 28);

    // Get month name
    const monthName = approxStart.toLocaleString("default", { month: "long" });

    setTopMonth(monthName);
  }, []);


  return (
    <div className="spotify-container">
      <div className="profile-section">
        <img src="/profile.jpg" alt="Profile" className="profile-image" />
        <h1 className="username">YOUR USERNAME</h1>
        <p className="bio">
          Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <button className="edit-button">Edit Profile</button>

        <p className="listening-status">currently listening to / recently played</p>

        <div className="connect-buttons">
          <button className="connect">Connect with [Name]!</button>
          <button className="connect">@instagram_username</button>
          <button className="connect">Spotify Name</button>
        </div>
        <button className="edit-button">Edit Links</button>
      </div>

      <div className="stats-section">
        <h2 className="section-header">In {topMonth}...</h2>
        <div className="stats-content">



<div className="top-artists">
  <h3 className="sub-header">Your Top Artists</h3>
  <div className="artist-grid">
    {topArtists.slice(0, 4).map((artist, index) => (
      <div key={artist.id || index} className="artist-item">
        <img
          src={artist.images?.[0]?.url || "/default-artist.jpg"}
          alt={artist.name}
          className="artist-img"
        />
      <span className="text-sm mt-2 text-center">{artist.name}</span>
      </div>
    ))}
  </div>
</div>








<div className="top-songs">
  <h3 className="sub-header">Your Top Songs</h3>
  <ul className="song-list">
    {topTracks.slice(0, 4).map((track) => (
      <li key={track.id} className="song-item">
        <div className="song-details">
          <img
            src={track.album?.images?.[0]?.url || "/default-track.jpg"}
            alt={track.name}
            className="song-img"
          />
          <div>
            <p className="song-name">{track.name}</p>
            <p className="song-meta">{track.album.name}</p>
            <p className="song-meta">{track.artists[0].name}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>



        </div>
      </div>
    </div>
  );
};

export default SpotifyStats;

