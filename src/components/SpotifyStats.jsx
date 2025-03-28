import React from "react";
import "./SpotifyStats.css";

const SpotifyStats = ({ topArtists, topTracks }) => {
  return (
    <div>
      <div className="now-playing">
        <div className="now-playing-header">
          <span>🎧</span> 
          <span className="song-info">
            <strong>{nowPlaying.track} | {nowPlaying.artist}</strong>
          </span>
        </div>
        <p>currently listening to/recently played</p>
        <p>Connect with {userName}!</p>

        <div className="social-links">
          <button className="social-btn">
            <img src="instagram-icon.png" alt="Instagram" />
            @{instagramHandle}
          </button>
          <button className="social-btn">
            <img src="spotify-icon.png" alt="Spotify" />
            {spotifyName}
          </button>
        </div>
      </div>

      <div className="spotify-stats">
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
                <div className="play-count">
                  Played {track.playcount} Times
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