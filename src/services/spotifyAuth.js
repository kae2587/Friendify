const CLIENT_ID = "e6ebb0dc60fa4353b0965ab1e1e9cb65";
const REDIRECT_URI =
  window.location.hostname === "localhost"
    ? "http://localhost:5173"
    : "https://friendify-ab070.web.app";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = ["user-top-read"];

export const loginWithSpotify = () => {
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
    // const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
  console.log("Redirecting to Spotify:", authUrl);

  setTimeout(() => {
    window.location.href = authUrl;
  }, 100);
  // window.location.href = authUrl;
};

export const logoutSpotify = () => {
  localStorage.removeItem("spotify_access_token");
  window.location.href = "/"; // Redirect to login screen
};