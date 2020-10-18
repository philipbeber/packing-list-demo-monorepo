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
const version = "0.1";

store.subscribe(
  _.throttle(() => {
    try {
      const state = store.getState() as any;
      state.version = version;
      const serializedState = JSON.stringify(state);
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
      if (state.version === version) {
        return state;
      }
    }
  } catch (err) {
    console.warn(err);
  }
  return undefined;
}
