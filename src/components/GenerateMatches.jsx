import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import "../App.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaInstagram, FaSpotify } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

import {
  fetchUserTopTracks,
  fetchUserTopArtists,
  fetchArtistInfoByName,
} from "../services/spotifyService";
import {
  saveUserSpotifyData,
  getAllUsersTopArtists,
} from "../firebase/userData";
import { auth } from "../firebase/firebase";

import tempProfilePicture from '../assets/tempProfilePicture.jpg';
import user1img from '../assets/user1.jpg';
import user2img from '../assets/user2.jpg';
import user3img from '../assets/user3.jpg';
import user4img from '../assets/user4.jpg';
import user5img from '../assets/user5.jpg';

// Utility: calculate cosine similarity
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
};

// Utility: get 10 unique random indices
const getRandomIndices = (length, count = 10) => {
  const indices = new Set();
  while (indices.size < Math.min(count, length)) {
    indices.add(Math.floor(Math.random() * length));
  }
  return Array.from(indices);
};

const GenerateMatches = () => {
  const [allTopArtists, setAllTopArtists] = useState([]);
  const [artistsStats, setArtistsStats] = useState([]);

  const [topMatches, setTopMatches] = useState([]);
  const [originalMatches, setOriginalMatches] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetting, setResetting] = useState(false);
  const [clickBut, setClickBut] = useState(false);
  const [direction, setDirection] = useState(1);

  const [specificUser, setSpecificUser] = useState({
    userName: "",
    topArtists: [],
    instagram: "",
    spotify: "",
    profilePic: "",
    bio: ""
  });
  
  const profileImages = {
    user1: user1img,
    user2: user2img,
    user3: user3img,
    user4: user4img,
    user5: user5img,
  };

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) setAccessToken(token);
  }, []);

  useEffect(() => {
    const fetchAndSaveSpotifyData = async () => {
      const user = auth.currentUser;
      try {
        const tracks = await fetchUserTopTracks(accessToken);
        const artists = await fetchUserTopArtists(accessToken);
        setTopTracks(tracks);
        setTopArtists(artists);

        await saveUserSpotifyData(user.uid, {
          spotifyAccessToken: accessToken,
          topTracks: tracks,
          topArtists: artists,
        });
      } catch (err) {
        console.error("Error saving to Firebase:", err);
      }
    };

    fetchAndSaveSpotifyData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsData = [
          {
            uid: "user1",
            name: "Allison",
            instagram: "@Allison.account12",
            spotify: "AllisonListens",
            profilePic: user1img,
            topArtists: [
              { id: "1", name: "Taylor Swift" },
              { id: "2", name: "SZA" },
              { id: "3", name: "Bad Bunny" },
              { id: "4", name: "Lorde" },
            ],
          },
          {
            uid: "user2",
            name: "David",
            instagram: "@David.account12",
            spotify: "DavidSpot",
            profilePic: user2img,
            topArtists: [
              { id: "1", name: "Taylor Swift" },
              { id: "2", name: "SZA" },
              { id: "3", name: "Bad Bunny" },
              { id: "4", name: "Lorde" },
            ],
          },
          {
            uid: "user3",
            name: "Carmen",
            instagram: "@Carmen.account12",
            spotify: "CarmenListeningAcc",
            profilePic: user3img,
            topArtists: [
              { id: "1", name: "Taylor Swift" },
              { id: "2", name: "SZA" },
              { id: "3", name: "Bad Bunny" },
              { id: "4", name: "Lorde" },
            ],
          },
          {
            uid: "user4",
            name: "Another Parnika",
            instagram: "parnika__c",
            bio: "Another Parnika's Bio - still building Friendify!",
            spotify: "ksz239vziy62jv92szo9h8vnm",
            profilePic: user4img,
            topArtists: [
              { id: "1", name: "J. Cole" },
              { id: "2", name: "Beyoncé" },
              { id: "3", name: "Kendrick Lamar" },
              { id: "4", name: "Tyler, The Creator" },
            ],
          },
          {
            uid: "user5",
            name: "Parnika 2.0",
            instagram: "parnika__c",
            spotify: "ksz239vziy62jv92szo9h8vnm",
            bio: "Hi! I love listening to music",
            profilePic: user5img,
            topArtists: [
              { id: "1", name: "J. Cole" },
              { id: "2", name: "Tyler, The Creator" },
              { id: "3", name: "Kendrick Lamar" },
              { id: "4", name: "MF DOOM" },
            ],
          },
        ];
        setAllTopArtists(artistsData);
      } catch (err) {
        console.error("Error fetching all users' top artists:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allTopArtists.length === 0 || !topArtists || topArtists.length === 0) return;

    const uniqueArtists = new Set();
    allTopArtists.forEach((user) =>
      user.topArtists.forEach((artist) => uniqueArtists.add(artist.name.trim()))
    );
    topArtists.forEach((artist) => uniqueArtists.add(artist.name.trim()));
    const artistList = Array.from(uniqueArtists);

    const toVector = (userArtists) => {
      const artistNames = userArtists.map((a) => a.name.trim());
      return artistList.map((name) => (artistNames.includes(name) ? 1 : 0));
    };

    const currentUserVector = toVector(topArtists);
    const indices = getRandomIndices(allTopArtists.length, 10);
    const candidates = indices.map((i) => allTopArtists[i]);

    const matches = candidates
      .map((user) => {
        const otherVector = toVector(user.topArtists);
        const similarity = cosineSimilarity(currentUserVector, otherVector);
        return { uid: user.uid, name: user.name, similarity };
      })
      .filter((match) => match.similarity >= 0.7);

    setOriginalMatches(matches);
    setTopMatches(matches);
    setCurrentIndex(0);
  }, [allTopArtists, topArtists]);

  // Reset the stack when empty
  useEffect(() => {
    if (topMatches.length === 0 && originalMatches.length > 0) {
      setResetting(true);
      setTimeout(() => {
        setTopMatches(originalMatches);
        setCurrentIndex(0);
        setResetting(false);
      }, 1000);
    }
  }, [topMatches, originalMatches]);

  const handleGenerateClick = async () => {
    const currentUID = topMatches[currentIndex]?.uid;
    const matchedUser = allTopArtists.find((user) => user.uid === currentUID);

    if (matchedUser) {
      const enrichedArtists = await Promise.all(
        matchedUser.topArtists.map(async (artistObj) => {
          console.log("artist name",artistObj.name);
          const info = await fetchArtistInfoByName(artistObj.name, accessToken);
          console.log("artist info",info);

          return info;
        })
      );

      setArtistsStats(enrichedArtists);
      console.log("artist Stats",enrichedArtists);

      setSpecificUser({
        userName: matchedUser.name,
        topArtists: matchedUser.topArtists,
        instagram: matchedUser.instagram,
        spotify: matchedUser.spotify,
        profilePic: matchedUser.profilePic,
        bio: matchedUser.bio,
      });
    }

   setClickBut(true);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < topMatches.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : topMatches.length - 1
    );
  };

  return (
    clickBut ? (
    <div className="another-user-container">
      <div className="profile-section">
        <div className="profile-content another-user">
          <img src={specificUser.profilePic || "/default-profile.png"} alt="Profile Picture" className="profile-image" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h1>{specificUser.userName}</h1>
            <p className="bio">{specificUser.bio || "No bio provided."}</p>
            <div className="social-buttons">
              <p style={{ marginTop: 10 }}> <strong>{specificUser.userName ? `Connect with ${specificUser.userName}` : 'Connect'}! </strong></p>
              <button className="social-button"
                onClick={() => window.open(`https://www.instagram.com/${specificUser.instagram}`, '_blank')}>
                <FaInstagram class="icon" />
                @{specificUser.instagram}
              </button>
              <button className="social-button"
                onClick={() => window.open(`https://open.spotify.com/user/${specificUser.spotifyName}`, '_blank')}>
                <FaSpotify class="icon" />
                on Spotify
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          {/* Top Artists */}
          <div className="top-artists another-user">
            <h2>Current Top Artists</h2>
            <div className="artist-grid">
            {specificUser.topArtists?.map((artist, index) => {
              // Match the enriched artist info from artistsStats by name
              const enriched = artistsStats.find((a) => a?.name === artist.name);
                return (
                  <div key={index} className="artist-item">
                    <img
                      src={enriched?.image || "/default-artist.png"}
                      alt={artist.name}
                      className="artist-img"
                    />
                    <p>{artist.name}</p>
                  </div>
                );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>

    ) : (
      <div className="generate-page">
        <div className="generate-content centered">
          {resetting ? (
            <p>Restarting Matches...</p>
          ) : topMatches.length === 0 ? (
            <p><strong>No current matches, please come back later!</strong></p>
          ) : (
            <>
              <h2 className="matches-title">Meet your matches!</h2>
              <div className="cards-container">
                <button className="arrow" onClick={handlePrev}>
                  <ArrowLeft size={32} />
                </button>

                <AnimatePresence mode="wait" initial={false}>
                  
                    <motion.div
                      // key={topMatches[currentIndex]?.uid}
                      key={currentIndex}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(event, info) => {
                        if (info.offset.x > 100) {
                          handlePrev(); // swipe right
                        } else if (info.offset.x < -100) {
                          handleNext(); // swipe left
                        }
                      }}
                      initial={{ opacity: 0, x: direction*150, rotate: 8*direction }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      exit={{ opacity: 0, x: direction*-500, rotate: 8*direction }}
                      transition={{ duration: 0.15, ease: [0.45, 0, 0.55, 1] }}
                      className="profile-card"
                    >
                      <img
                        src={profileImages[topMatches[currentIndex]?.uid] || tempProfilePicture}
                        alt="Profile"
                        className="profile-image"
                      />
                      <h3 className="profile-name">
                        {topMatches[currentIndex]?.name}
                      </h3>
                      <button className="view-profile" onClick={handleGenerateClick}>
                        View Profile
                      </button>
                    </motion.div>

                </AnimatePresence>

                <button className="arrow" onClick={handleNext}>
                  <ArrowRight size={32} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}  
export default GenerateMatches;

