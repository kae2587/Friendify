import React from "react";
import { useEffect, useState } from "react";
import "./SpotifyStats.css";
import image from '../assets/tempProfilePicture.jpg';

const SpotifyStats = ({ topArtists, topTracks }) => {
  const [topMonth, setTopMonth] = useState("");

  useEffect(() => {
    const fetchedAt = new Date();
    const approxStart = new Date(fetchedAt);
    approxStart.setDate(fetchedAt.getDate() - 28); //subtract 28 days for around 4 weeks ago
    const monthName = approxStart.toLocaleString("default", { month: "long" }); //get month name
    setTopMonth(monthName);
  }, []);

  return (
    <div>
      <div className="spotify-container">
        <div className="profile-section">
          <img src={image} alt="Profile Picture" className="profile-image" />
          <div>
            <h1>User's Name</h1>
            <p className="bio">
              Bio Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </p>
            <div className="social-buttons">
              <p style={{marginTop: 10}}><strong>Linked Social Accounts</strong></p>
              <button className="social-button">@instagram_username</button>
              <button className="social-button">Spotify Name</button>
            </div>
            <button className="edit-button">Edit Profile</button>
          </div>
        </div>

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
    </div>
  );
};

export default SpotifyStats;