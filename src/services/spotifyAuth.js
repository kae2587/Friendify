// const CLIENT_ID = "e6ebb0dc60fa4353b0965ab1e1e9cb65";
// const REDIRECT_URI = "http://localhost:5173"; //update domain
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
// const RESPONSE_TYPE = "token";
// const SCOPES = ["user-top-read"];

// export const loginWithSpotify = () => {
//   const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
//   window.location.href = authUrl;
// };

// // export const handleSpotifyRedirect = () => {
// //   const params = new URLSearchParams(window.location.hash.substring(1));
// //   const accessToken = params.get("access_token");

// //   if (accessToken) {
// //     localStorage.setItem("spotify_access_token", accessToken);
// //     window.location.hash = "";
// //   }
// // };

// export const logoutSpotify = () => {
//   localStorage.removeItem("spotify_access_token");
//   window.location.href = "/"; // Redirect to login screen
// };

const CLIENT_ID = "e6ebb0dc60fa4353b0965ab1e1e9cb65";
const REDIRECT_URI = "http://localhost:5173"; // Change this in production
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = ["user-top-read"]; // You can add more scopes like "user-read-email"

export const loginWithSpotify = () => {
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES.join(" "))}`;

  window.location.href = authUrl;
};

export const handleSpotifyRedirect = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");

  if (accessToken) {
    localStorage.setItem("spotify_access_token", accessToken);
    localStorage.setItem("spotify_token_timestamp", Date.now().toString());
    window.location.hash = ""; // Clean up the URL
    return accessToken;
  }

  return null;
};

export const logoutSpotify = () => {
  localStorage.removeItem("spotify_access_token");
  localStorage.removeItem("spotify_token_timestamp");
  window.location.href = "/";
};
