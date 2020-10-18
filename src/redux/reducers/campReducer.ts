import { applyOperationToCamp, Camp, CampOperations } from "../../model";
import { CampActions } from "../actions/campActions";

interface CampState {
  selectedCamp?: {
    id: string;
    name: string;
    lists: { id: string; name: string }[];
  };
  selectedList?: string;
  camps: Camp[];
  pendingOperations: CampOperations[];
}
export const initialState: CampState = {
  camps: [],
  pendingOperations: [],
};
const campReducer = (
  state: CampState = initialState,
  action: CampActions
): CampState => {
  switch (action.type) {
    case "OPEN_CAMP": {
      const camp = state.camps.find((c) => c.id === action.payload);
      return {
        ...state,
        selectedCamp: mapCampToSelectedCamp(camp),
      };
    }
    case "CLOSE_CAMP": {
      return {
        ...state,
        selectedCamp: undefined,
      };
    }
    case "OPEN_CAMP_LIST": {
      return {
        ...state,
        selectedList: action.payload.listId,
      };
    }
    case "CLOSE_CAMP_LIST": {
      return {
        ...state,
        selectedList: undefined,
      };
    }
    case "CREATE_CAMP": {
      const newCamp = action.payload.camp;
      return {
        ...state,
        selectedCamp: mapCampToSelectedCamp(newCamp),
        camps: [...state.camps, newCamp],
      };
    }
    case "USER_OPERATION": {
      const operation = action.payload;
      const camp = state.camps.find((c) => c.id === operation.campId);
      if (!camp) {
        return state;
      }
      const newCamp = applyOperationToCamp(camp, operation);
      return {
        ...state,
        camps: state.camps.map((c) => (c.id === camp.id ? newCamp : c)),
        pendingOperations: [...state.pendingOperations, operation],
        selectedCamp:
          state.selectedCamp !== newCamp && state.selectedCamp?.id === camp.id
            ? mapCampToSelectedCamp(newCamp)
            : state.selectedCamp,
      };
    }
    case "CLEAR_CAMP_DATA":
      return initialState;
    default:
      return state;
  }
};
export default campReducer;

function mapCampToSelectedCamp(camp?: Camp) {
  if (!camp) {
    return undefined;
  }
  return {
    id: camp.id,
    name: camp.name,
    lists: camp.lists.map((l) => ({
      id: l.id,
      name: l.name,
    })),
  };
}
