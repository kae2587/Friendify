import { useEffect, useState } from "react";
import { fetchUserTopTracks, fetchUserTopArtists } from "./services/spotifyService";
import { loginWithSpotify, logoutSpotify } from "./services/spotifyAuth";
import AuthForm from "./components/AuthForm";
import SpotifyStats from "./components/SpotifyStats";
import Header from "./components/Header";

import { saveUserSpotifyData } from "./firebase/userData";
import { auth } from "./firebase/firebase"; //to get currentUser

import "./App.css";

function App() {
  const [user, setUser] = useState(null); //Firebase user
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token"));
  
  //Firebase login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  //Get Spotify access token
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        localStorage.setItem("spotify_access_token", token);
        setAccessToken(token);
        window.location.hash = ""; //clean URL
      }
    }
  }, []);

  //fetch & save Spotify data to Firestore
  useEffect(() => {
    const fetchAndSaveSpotifyData = async () => {
      if (!accessToken) {
        console.warn("Missing token");
        return;
      }
      if (!user) {
        console.warn("Missing Firebase user");
        return;
      }
  
      try {
        const tracks = await fetchUserTopTracks(accessToken);
        const artists = await fetchUserTopArtists(accessToken);
        
        setTopTracks(tracks);
        setTopArtists(artists);
        
        console.log("Current Firebase user:", auth.currentUser);

        await saveUserSpotifyData(auth.currentUser.uid, {
          spotifyAccessToken: accessToken,
          topTracks: tracks,
          topArtists: artists,
        });
      } catch (err) {
        console.error("Error saving to Firebase:", err);
      }
    };
  
    fetchAndSaveSpotifyData();
  }, [accessToken, user]);

  const handleFullLogout = () => {
    localStorage.removeItem("spotify_access_token"); //Spotify logout
    setAccessToken(null);
  
    auth.signOut().then(() => { //Firebase logout
      console.log("Logged out of Firebase");
    });
  };

  return (
    <div>
      {!user ? ( //not logged in --> show Firebase auth form
        <AuthForm />
      ) : !accessToken ? ( //logged in, but not connected to Spotify
        <div>
          <h2 style={{ margin: '10px' }}>One More Step!</h2>
          <button onClick={loginWithSpotify}>Please connect your Spotify account.</button>
        </div>
      ) : ( //logged in + connected --> show stats
        <>
        <div className="headerDiv">
          <Header />
        </div>
        <SpotifyStats topTracks={topTracks} topArtists={topArtists} />
        <button className="LogOutBut" onClick={handleFullLogout}>Logout</button>
      </>
      )}
    </div>
  );
}

export default App;