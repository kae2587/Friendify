// import React from "react";
// import { useEffect, useState } from "react";
// import Header from "./Header";
// import "../App.css";

// import { getAllUsersTopArtists } from "../firebase/userData";


// const GenerateMatches = ({ topTracks }) => {
// const [allTopArtists, setAllTopArtists] = useState([]);

//   useEffect(() => {

//     const fetchData = async () => {
//       const artistsData = await getAllUsersTopArtists();
//       setAllTopArtists(artistsData);


//     };
//     fetchData();
//   }, []);




//   return (
//     <div className="generate-page">
//       <Header />
//       {/* <div className="generate-content">
//         <h2>All Users' Top Artists</h2>
//         {allTopArtists.length === 0 ? (
//           <p>Loading...</p>
//         ) : (
//           <ul>
//             {allTopArtists.map(({ uid, topArtists }) => (
//               <li key={uid}>
//                 <strong>{uid}</strong>
//                 <ul>
//                   {topArtists.map((artist, index) => (
//                     <li key={index}>{artist}</li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div> */}
//     </div>
//   );
// };


// export default GenerateMatches;


import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../App.css";
import { getAllUsersTopArtists } from "../firebase/userData";



const GenerateMatches = ({ topArtists }) => {
  const [allTopArtists, setAllTopArtists] = useState([]);




  useEffect(() => {

    const fetchData = async () => {
      const artistsData = await getAllUsersTopArtists();
      setAllTopArtists(artistsData);
  
    };

    fetchData();
  }, []);



  useEffect(() => {

    const fetchTopMatches = async () => {
        
      if (allTopArtists.length != 0){
        const dotProduct = allTopArtists[0].reduce((sum, val, i) => sum + val * allTopArtists[1], 0);
        const magnitudeA = Math.sqrt(allTopArtists[0].reduce((sum, val) => sum + val * val, 0));
        const magnitudeB = Math.sqrt(allTopArtists[1].reduce((sum, val) => sum + val * val, 0));
      
        if (magnitudeA === 0 || magnitudeB === 0) {
          return 0;
        }
      
        const result = dotProduct / (magnitudeA * magnitudeB);

        //alert(result);
        alert (result);
        alert (result);
       // return dotProduct / (magnitudeA * magnitudeB);



      }



  
    };

    fetchTopMatches();
  }, [allTopArtists]);

  return (
    <div className="generate-page">
      <Header />
      <div className="generate-content">
        <h2>All Users' Top Artists</h2>
        {allTopArtists.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {allTopArtists.map(({ uid, topArtists }) => (
              <li key={uid}>
                <strong>User: {uid}</strong>
                <ul>
                  {topArtists.map((artist, index) => (
                    <li key={index}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Artist
                      </a>
                      {artist.name && <span> – {artist.name}</span>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GenerateMatches;
