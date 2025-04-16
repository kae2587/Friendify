
// import React from "react";

// const SpotifyStats = ({ topArtists, topTracks }) => {
//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="flex flex-col items-center text-center">
//         <img
//           src="/profile.jpg"
//           alt="Profile"
//           className="w-40 h-40 rounded-full object-cover"
//         />
//         <h1 className="text-2xl font-semibold mt-4">YOUR USERNAME</h1>
//         <p className="text-gray-400 text-sm max-w-md mt-2">
//           Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua
//         </p>
//         <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 mt-4 rounded">
//           Edit Profile
//         </button>

//         {/* Toggle and listening note */}
//         <div className="flex mt-4 space-x-2">
//           <button className="bg-white text-black px-3 py-1 rounded font-medium">
//             Song Name
//           </button>
//           <button className="bg-gray-700 px-3 py-1 rounded font-medium">
//             Artist Name
//           </button>
//         </div>

//         <p className="text-gray-400 mt-2 text-sm">
//           currently listening to / recently played
//         </p>

//         {/* Connect buttons */}
//         <div className="flex flex-col space-y-2 mt-4 w-full max-w-xs">
//           <button className="bg-gray-800 text-white px-4 py-2 rounded">
//             Connect with [Name]!
//           </button>
//           <button className="bg-gray-800 text-white px-4 py-2 rounded">
//             📷 @instagram_username
//           </button>
//           <button className="bg-gray-800 text-white px-4 py-2 rounded">
//             🎵 Spotify Name
//           </button>
//         </div>

//         <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 mt-4 rounded">
//           Edit Links
//         </button>
//       </div>

//       {/* Top Stats */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold text-center mb-8">In February...</h2>

//         <div className="flex flex-col md:flex-row md:justify-between gap-12">
          // {/* Top Artists */}
          // <div className="flex-1">
          //   <h3 className="text-lg font-medium mb-4">Your Top Artists</h3>
          //   <div className="grid grid-cols-2 gap-4">
          //     {topArtists.slice(0, 4).map((artist, index) => (
          //       <div key={artist.id || index} className="flex flex-col items-center">
          //         <img
          //           src={artist.images?.[0]?.url || "/default-artist.jpg"}
          //           alt={artist.name}
          //           className="w-24 h-24 rounded-full object-cover"
          //         />
          //         <span className="text-sm mt-2 text-center">{artist.name}</span>
          //       </div>
          //     ))}
          //   </div>
          // </div>

//           {/* Top Tracks */}
//           <div className="flex-1">
//             <h3 className="text-lg font-medium mb-4">Your Top Songs</h3>
//             <ul className="space-y-4">
//               {topTracks.slice(0, 4).map((track) => (
//                 <li
//                   key={track.id}
//                   className="flex items-center justify-between"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <img
//                       src={track.album?.images?.[0]?.url || "/default-track.jpg"}
//                       alt={track.name}
//                       className="w-14 h-14 object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold">{track.name}</p>
//                       <p className="text-sm text-gray-400">{track.album.name}</p>
//                       <p className="text-sm text-gray-400">
//                         {track.artists[0].name}
//                       </p>
//                     </div>
//                   </div>
//                   <span className="bg-gray-700 text-sm px-2 py-1 rounded">
//                     Played X times
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpotifyStats;


import React from "react";
import "./SpotifyStats.css"; // This links to your CSS file

const SpotifyStats = ({ topArtists, topTracks }) => {
  return (
    <div className="spotify-container">
      <div className="profile-section">
        <img src="/profile.jpg" alt="Profile" className="profile-image" />
        <h1 className="username">YOUR USERNAME</h1>
        <p className="bio">
          Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <button className="edit-button">Edit Profile</button>

        <p className="listening-status">currently listening to / recently played</p>

        <div className="connect-buttons">
          <button className="connect">Connect with [Name]!</button>
          <button className="connect">@instagram_username</button>
          <button className="connect">Spotify Name</button>
        </div>
        <button className="edit-button">Edit Links</button>
      </div>

      <div className="stats-section">
        <h2 className="section-header">In February...</h2>
        <div className="stats-content">



<div className="top-artists">
  <h3 className="sub-header">Your Top Artists</h3>
  <div className="artist-grid">
    {topArtists.slice(0, 4).map((artist, index) => (
      <div key={artist.id || index} className="artist-item">
        <img
          src={artist.images?.[0]?.url || "/default-artist.jpg"}
          alt={artist.name}
          className="artist-img"
        />
      <span className="text-sm mt-2 text-center">{artist.name}</span>
      </div>
    ))}
  </div>
</div>








<div className="top-songs">
  <h3 className="sub-header">Your Top Songs</h3>
  <ul className="song-list">
    {topTracks.slice(0, 4).map((track) => (
      <li key={track.id} className="song-item">
        <div className="song-details">
          <img
            src={track.album?.images?.[0]?.url || "/default-track.jpg"}
            alt={track.name}
            className="song-img"
          />
          <div>
            <p className="song-name">{track.name}</p>
            <p className="song-meta">{track.album.name}</p>
            <p className="song-meta">{track.artists[0].name}</p>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>



        </div>
      </div>
    </div>
  );
};

export default SpotifyStats;

