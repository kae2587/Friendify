import { Routes, Route } from "react-router-dom";
import SpotifyStats from "./SpotifyStats";
import GenerateMatches from "./GenerateMatches";

const Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<SpotifyStats />} />
      <Route path="/generate-matches" element={<GenerateMatches />} />
    </Routes>
  );


};

export default Routes;
