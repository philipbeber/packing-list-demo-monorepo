import * as _ from "lodash";
import { createStore, Store } from "redux";
import rootReducer, { AppState } from "../reducers/rootReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import { AppActions } from "../actions";
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
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
}
