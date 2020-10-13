import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "./redux/reducers/rootReducer";
import HomePage from "./pages/homePage";
import CampPage from "./pages/campPage";
function App() {
  const selectedCamp = useSelector<AppState>(
    (state) => state.camp.selectedCamp
  );
  return <div>{selectedCamp ? <CampPage /> : <HomePage />}</div>;
}
export default App;
