import React from "react";
import { useSelector } from "packing-list-shared";
import { AppState } from "packing-list-shared";
import HomePage from "./pages/homePage";
import CampPage from "./pages/campPage";
function App() {
  const selectedCampId = useSelector<AppState>(
    (state) => state.camp.selectedCampId
  );
  return <div>{selectedCampId ? <CampPage /> : <HomePage />}</div>;
}
export default App;
