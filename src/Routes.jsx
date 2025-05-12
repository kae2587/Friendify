import { Routes, Route } from "react-router-dom";
import SpotifyStats from "./SpotifyStats";
import GenerateMatches from "./GenerateMatches";
import SpecificUserStats from "./SpecificUserStats";

const Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<SpotifyStats />} />
      <Route path="/generate-matches" element={<GenerateMatches />} />
      <Route path="/specific-stats" element={<SpecificUserStats />} />
    </Routes>
  );


};

export default Routes;


