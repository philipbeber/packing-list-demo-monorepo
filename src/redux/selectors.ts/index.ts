import { createSelector } from "reselect";
import { AppState } from "../reducers/rootReducer";

export const selectedCampSelector = createSelector(
  (state: AppState) => state.camp.camps,
  (state: AppState) => state.camp.selectedCamp,
  (camps, selectedCamp) => {
    return camps.find((c) => c.id === selectedCamp?.id);
  }
);

export const selectedListSelector = createSelector(
  (state: AppState) => selectedCampSelector(state),
  (state: AppState) => state.camp.selectedList,
  (selectedCamp, selectedList) => {
    return selectedCamp?.lists.find((l) => l.id === selectedList);
  }
);
