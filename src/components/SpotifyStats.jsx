import React from "react";
import "./SpotifyStats.css";

const SpotifyStats = ({ topArtists, topTracks }) => {
  return (
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
  );
};

export default SpotifyStats;