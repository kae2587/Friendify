const express = require("express");
const axios = require("axios");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.get("/login", (req, res) => {
  const scope = "user-top-read";
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${scope}`;
  res.redirect(authUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: "No code provided" });

  try {
    const tokenRes = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }));

    const { access_token, refresh_token } = tokenRes.data;

    const userRes = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    let user = await User.findOne({ spotifyId: userRes.data.id });
    if (!user) {
      user = new User({
        spotifyId: userRes.data.id,
        displayName: userRes.data.display_name,
        email: userRes.data.email,
        profilePic: userRes.data.images[0]?.url,
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    } else {
      user.accessToken = access_token;
      user.refreshToken = refresh_token;
    }

    await user.save();
    res.redirect(`http://localhost:3000/dashboard?token=${access_token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;