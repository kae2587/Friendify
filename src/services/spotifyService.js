import axios from "axios";

export const fetchUserTopTracks = async (accessToken) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 4,
        time_range: "short_term",
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
};

export const fetchUserTopArtists = async (accessToken) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 4,
        time_range: "short_term",
      },
    });

    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return [];
  }
}