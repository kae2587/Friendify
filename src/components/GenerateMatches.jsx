import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import "../App.css";
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
import user1img from '../assets/user1.jpg';
import user2img from '../assets/user2.jpg';
import user3img from '../assets/user3.jpg';
import user4img from '../assets/user4.jpg';




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

  const [specificUser, setSpecificUser] = useState({
    userName: "",
    topArtists: [],
    instagram: "",
    spotify: "",
    profilePic: ""
  });
  
  const cardRefs = useRef({});
  const profileImages = {
    user1: user1img,
    user2: user2img,
    user3: user3img,
    user4: user4img,
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

  const handleDragStart = (e, i) => {
    const card = cardRefs.current[i];
    card.startX = e.clientX || e.touches[0].clientX;
  };

  const handleDragMove = (e, i) => {
    const card = cardRefs.current[i];
    if (!card.startX) return;
    const x = (e.clientX || e.touches[0].clientX) - card.startX;
    card.style.transform = `translateX(${x}px) rotate(${x / 10}deg)`;
    card.x = x;
  };

  const handleDragEnd = (e, i) => {
    const card = cardRefs.current[i];
    const threshold = 100;

    if (card.x > threshold || card.x < -threshold) {
      card.style.transition = "transform 0.3s ease-out";
      card.style.transform = `translateX(${card.x > 0 ? 1000 : -1000}px) rotate(${card.x / 10}deg)`;

      setTimeout(() => {
        card.style.transition = "none";
        card.style.transform = "none";
        card.startX = null;
        card.x = 0;

        setTopMatches((prev) => {
          const newDeck = [...prev];
          newDeck.splice(i, 1);
          return newDeck;
        });

        setCurrentIndex(0);
      }, 300);
    } else {
      card.style.transition = "transform 0.2s ease";
      card.style.transform = "translateX(0px) rotate(0deg)";
      setTimeout(() => {
        card.style.transition = "none";
      }, 200);
    }

    card.startX = null;
    card.x = 0;
  };

  const handleArrowSwipe = (direction) => {
    const i = currentIndex;
    const card = cardRefs.current[i];
    if (!card) return;

    const swipeDistance = direction === "left" ? -1000 : 1000;
    card.style.transition = "transform 0.3s ease-out";
    card.style.transform = `translateX(${swipeDistance}px) rotate(${swipeDistance / 10}deg)`;

    setTimeout(() => {
      card.style.transition = "none";
      card.style.transform = "none";
      card.startX = null;
      card.x = 0;

      setTopMatches((prev) => {
        const newDeck = [...prev];
        newDeck.splice(i, 1);
        return newDeck;
      });

      setCurrentIndex(0);
    }, 300);
  };


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
      });
    }

   setClickBut(true);
  };

  return (
    clickBut ? (

    <div className="spotify-container">
       <Header />
    <div className="profile-section">
      <div className="profile-content">
        <img
          src={specificUser.profilePic || "/default-profile.png"}
          alt="Profile Picture"
          className="profile-image"
        />
        <div>
          <h1>{specificUser.userName}'s Account</h1>
          <p className="bio">A Bio</p>
          <div className="social-buttons">
            <p style={{ marginTop: 10 }}>
              <strong>Linked Social Accounts</strong>
            </p>
            <button className="social-button">{specificUser.instagram}</button>
            <button className="social-button">{specificUser.spotify}</button>
          </div>
        </div>
      </div>
    </div>

    <div className="stats-section">
      <h1>In the Last Month...</h1>
      <div className="stats-grid">
        {/* Top Artists */}
        <div className="top-artists">
          <h2>Top Artists</h2>
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
        <Header />
        <div className="generate-content centered">
          <h2>These are your matches!</h2>
          {resetting ? (
            <p>Restarting Matches...</p>
          ) : topMatches.length === 0 ? (
            <p>No current matches, come back later.</p>
          ) : (
            <>
              <div
                className="profile-card"
                ref={(el) => {
                  if (el) cardRefs.current[currentIndex] = el;
                }}
                onMouseDown={(e) => handleDragStart(e, currentIndex)}
                onTouchStart={(e) => handleDragStart(e, currentIndex)}
                onMouseMove={(e) => handleDragMove(e, currentIndex)}
                onTouchMove={(e) => handleDragMove(e, currentIndex)}
                onMouseUp={(e) => handleDragEnd(e, currentIndex)}
                onTouchEnd={(e) => handleDragEnd(e, currentIndex)}
                style={{ zIndex: 1 }}
              >
                <img
                  src={profileImages[topMatches[currentIndex]?.uid] || user1img}
                  alt="Profile"
                  className="profile-image"
                />
                <h3 className="profile-name">
                  {topMatches[currentIndex]?.name}
                </h3>
                <button className="view-profile" onClick={handleGenerateClick}>
                  View Profile
                </button>
              </div>
  
              <div className="arrow-buttons">
                <button className="arrow" onClick={() => handleArrowSwipe("left")}>
                  ←
                </button>
                <button className="arrow" onClick={() => handleArrowSwipe("right")}>
                  →
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

