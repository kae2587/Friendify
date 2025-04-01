import React from "react";
import { loginWithSpotify, logoutSpotify } from "../services/spotifyAuth";
import "./SpotifyStats.css";

const UserSpotifyStats = ({ topArtists = [], topTracks = [] }) => {
  return (
    <div className="scroll-wrapper">
      <img className="profile-pic" src="https://via.placeholder.com/180" alt="Profile" />
      <h1>YOUR USERNAME</h1>
      <p className="bio">Placeholder Bio</p>
      <button className="button">Edit Profile</button>

      <div className="song-info">
        <span>🎵 Song Name | Artist Name</span>
      </div>
      <p style={{ color: "#888" }}>currently listening to/recently played</p>

      <p>Connect with [Name]!</p>
      <div className="social-buttons">
        <button>@instagram_username</button>
        <button>Spotify Name</button>
      </div>

      <button className="button">Edit Links</button>

      <div className="section">
        <h2>In March...</h2>
        <div className="artists-songs">
          
          <div className="artists">
            <h3>Your Top Artists</h3>
            <div className="artist-grid">
              {topArtists.slice(0, 4).map((artist) => (
                <div key={artist.id}>
                  <div
                    className="artist-circle"
                    style={{
                      backgroundImage: `url(${artist.images[0]?.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="artist-label">{artist.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="top-songs">
            <h3>Your Top Songs</h3>
            {topTracks.map((track) => (
              <div key={track.id} className="song-item">
                <div className="song-details">
                  <img
                    className="song-thumb"
                    src={track.album.images[0]?.url}
                    alt={track.name}
                  />
                  <div className="song-meta">
                    <strong>{track.name}</strong>
                    <br />
                    <em>{track.album.name}</em>
                    <br />
                    {track.artists[0].name}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserSpotifyStats;

