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
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, prompt login again
      console.log("Token expired. Please log in again.");
      window.location.href = "/"; // Or redirect to login page
    }
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
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, prompt login again
      console.log("Token expired. Please log in again.");
      window.location.href = "/"; // Or redirect to login page
    }
    return [];
  }
}


export const fetchArtistInfoByName = async (artistName, accessToken) => {
  try {
  
    const searchRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: artistName,
        type: "artist",
        limit: 1,
      },
    });

    const artist = searchRes.data.artists.items[0];
    if (!artist) {
      console.warn("Artist not found.");
      return null;
    }

    return {
      name: artist.name,
      popularity: artist.popularity,
      followers: artist.followers.total,
      genres: artist.genres,
      image: artist.images[0]?.url || null,
      id: artist.id,
    };
  } catch (error) {
    console.error("Error fetching artist info:", error);
    return null;
  }
}