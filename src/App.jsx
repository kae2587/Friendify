import { useEffect, useState } from "react";
import { fetchUserTopTracks, fetchUserTopArtists } from "./services/spotifyService";
import { loginWithSpotify } from "./services/spotifyAuth";
import SpotifyStats from "./components/SpotifyStats";
import "./App.css";

function App() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token"));
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        localStorage.setItem("spotify_access_token", token);
        setAccessToken(token);
        window.location.hash = ""; // Clean URL
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchUserTopTracks(accessToken).then(setTopTracks);
      fetchUserTopArtists(accessToken).then(setTopArtists);
    }
  }, [accessToken]);

  return (
    <div>
      {accessToken ? (
        <SpotifyStats topTracks={topTracks} topArtists={topArtists} />
      ) : (
        <button onClick={loginWithSpotify}>Login with Spotify</button>
      )}
    </div>
  );
}

export default App;