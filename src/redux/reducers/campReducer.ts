import { Camp, Item, List } from "../../model";
import { CampActions } from "../actions/campActions";

interface CampState {
  selectedCamp?: {
    id: string;
    name: string;
    lists: { id: string; name: string }[];
  };
  selectedList?: List;
  camps: Camp[];
  // Derived from 'camps'. Could be a custom selector in homePage.tsx which would be neater
  // but then it would have to be re-calculated everytime the smallest thing changed. Having
  // it here means changes can be pushed only when necessary.
  list: { id: string; name: string }[];
}
const initialState: CampState = {
  list: [],
  camps: [],
};
const campReducer = (state: CampState = initialState, action: CampActions) => {
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
    case "CREATE_CAMP": {
      const newCamp = action.payload.camp;
      return {
        ...state,
        selectedCamp: action.payload.navigateTo
          ? mapCampToSelectedCamp(newCamp)
          : state.selectedCamp,
        camps: [...state.camps, newCamp],
        list: [...state.list, { id: newCamp.id, name: newCamp.name }],
      };
    }
    case "CREATE_CAMP_LIST": {
      const newList = action.payload.list;
      const camp = state.camps.find((c) => c.id === action.payload.campId);
      if (!camp) {
        return state;
      }
      const newCamp = {
        ...camp,
        lists: [...camp.lists, newList],
      };
      return {
        ...state,
        camps: state.camps.map((c) => (c.id === camp.id ? newCamp : c)),
        selectedCamp:
          state.selectedCamp?.id === camp.id
            ? mapCampToSelectedCamp(newCamp)
            : state.selectedCamp,
      };
    }
    case "OPEN_CAMP_LIST": {
      const camp = state.camps.find((c) => c.id === action.payload.campId);
      const list = camp?.lists.find((l) => l.id === action.payload.listId);
      return {
        ...state,
        selectedList: list,
      };
    }
    case "CLOSE_CAMP_LIST": {
      return {
        ...state,
        selectedList: undefined,
      };
    }
    case "CREATE_CAMP_ITEM": {
      const camp = state.camps.find((c) => c.id === action.payload.campId);
      const list = camp?.lists.find((l) => l.id === action.payload.listId);
      if (!camp || !list) {
        return state;
      }
      const newList = new List(list.id, list.name, [
        ...list.items,
        action.payload.item,
      ]);
      const newCamp = new Camp(
        camp.id,
        camp.name,
        camp.lists.map((l) => (l === list ? newList : l))
      );
      return {
        ...state,
        camps: state.camps.map((c) => (c === camp ? newCamp : c)),
        selectedList:
          state.selectedList?.id === list.id ? newList : state.selectedList,
      };
    }
    case "CHANGE_CAMP_ITEM_STATE": {
      const pl = action.payload;
      return transformItems(state, pl.campId, pl.listId, pl.itemIds, (item) =>
        item.state !== pl.state
          ? new Item(item.id, item.name, pl.state, item.deleted)
          : item
      );
    }
    case "CHANGE_CAMP_ITEM_DELETED": {
      const pl = action.payload;
      return transformItems(state, pl.campId, pl.listId, pl.itemIds, (item) =>
        item.deleted !== pl.deleted
          ? new Item(item.id, item.name, item.state, pl.deleted)
          : item
      );
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

function transformItems(
  state: CampState,
  campId: string,
  listId: string,
  itemIds: string[],
  transform: (item: Item) => Item
) {
  const camp = state.camps.find((c) => c.id === campId);
  const list = camp?.lists.find((l) => l.id === listId);
  if (!camp || !list) {
    return state;
  }
  let changed = false;
  const newItems = list.items.map((item) => {
    if (itemIds.indexOf(item.id) >= 0) {
      const newItem = transform(item);
      if (item !== newItem) {
        changed = true;
        return newItem;
      }
      return item;
    }
    return item;
  });
  if (!changed) {
    return state;
  }
  const newList = new List(list.id, list.name, newItems);
  const newCamp = new Camp(
    camp.id,
    camp.name,
    camp.lists.map((l) => (l === list ? newList : l))
  );
  return {
    ...state,
    camps: state.camps.map((c) => (c === camp ? newCamp : c)),
    selectedList:
      state.selectedList?.id === list.id ? newList : state.selectedList,
  };
}
