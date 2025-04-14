const express = require("express");
const axios = require("axios");
const User = require("../models/User");
const router = express.Router();

router.get("/top-tracks", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const response = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10", {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });

    user.topTracks = response.data.items;
    await user.save();

    res.json(user.topTracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

router.get("/top-artists", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const response = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=10", {
      headers: { Authorization: `Bearer ${user.accessToken}` }
    });

    user.topArtists = response.data.items;
    await user.save();

    res.json(user.topArtists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});

module.exports = router;