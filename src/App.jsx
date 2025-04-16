// import { useEffect, useState } from "react";
// import { fetchUserTopTracks, fetchUserTopArtists } from "./services/spotifyService";
// import { loginWithSpotify, logoutSpotify } from "./services/spotifyAuth";
// import SpotifyStats from "./components/SpotifyStats";
// import "./App.css";

// function App() {
//   const [topTracks, setTopTracks] = useState([]);
//   const [topArtists, setTopArtists] = useState([]);
//   const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token"));
  
//   useEffect(() => {
//     const hash = window.location.hash;
//     if (hash) {
//       const token = new URLSearchParams(hash.substring(1)).get("access_token");
//       if (token) {
//         localStorage.setItem("spotify_access_token", token);
//         setAccessToken(token);
//         window.location.hash = ""; // Clean URL
//       }
        
//     }
//   }, []);

//   useEffect(() => {
//     if (accessToken) {
//       fetchUserTopTracks(accessToken).then(setTopTracks);
//       fetchUserTopArtists(accessToken).then(setTopArtists);
//     }
    
//   }, [accessToken]);

//   return (
//     <div>
//       {accessToken ? (
//         <div>
//           <SpotifyStats topTracks={topTracks} topArtists={topArtists} />
//           <button onClick={logoutSpotify}>Logout of Spotify</button>
//         </div>
//       ) : (
//         <button onClick={loginWithSpotify}>Login with Spotify</button>
//       )}
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import SpotifyStats from "./components/SpotifyStats";
import { fetchUserTopTracks, fetchUserTopArtists } from "./services/spotifyService";
import {
  loginWithSpotify,
  handleSpotifyRedirect,
  logoutSpotify,
} from "./services/spotifyAuth";

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token"));
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    // Check if redirected back from Spotify with token
    const newToken = handleSpotifyRedirect();
    if (newToken) {
      setAccessToken(newToken);
    }
  }, []);

  useEffect(() => {
    const loadTopTracks = async () => {
      const tracks = await fetchUserTopTracks(accessToken);
      setTopTracks(tracks);
    };

    const loadTopArtists = async () => {
      const artists = await fetchUserTopArtists(accessToken);
      setTopArtists(artists);
    };


    if (accessToken) {
      loadTopTracks();
      loadTopArtists();
    }
  }, [accessToken]);

  return (
    <div>
      {!accessToken ? (
        <button onClick={loginWithSpotify}>Log in with Spotify</button>
      ) : (
        <>
          <SpotifyStats topTracks={topTracks} topArtists={topArtists}/>
          <button onClick={logoutSpotify}>Logout</button>

        </>
      )}
    </div>
  );
}

export default App;
