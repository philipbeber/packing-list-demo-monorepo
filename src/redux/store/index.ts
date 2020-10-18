import * as _ from "lodash";
import { createStore, Store } from "redux";
import rootReducer, { AppState } from "../reducers/rootReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import { AppActions } from "../actions";
import { initialState } from "../reducers/campReducer";
const store: Store<AppState, AppActions> = createStore(
  rootReducer,
  loadState(),
  devToolsEnhancer({})
);
export default store;

store.subscribe(
  _.throttle(() => {
    try {
      const serializedState = JSON.stringify(store.getState());
      localStorage.setItem("state", serializedState);
    } catch {
      // ignore write errors
    }
  }, 1000)
);

function loadState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState) {
      const state = JSON.parse(serializedState);
      state.camp = Object.assign({}, initialState, state.camp);
      console.log(state);
      return state;
    }
  } catch (err) {
    console.warn(err);
  }
  return undefined;
}
