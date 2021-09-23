import campReducer from "../reducers/campReducer";
import userReducer from "../reducers/userReducer";
import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { Storage } from "redux-persist";

const rootReducer = combineReducers({
  camp: campReducer,
  user: userReducer,
});

export function createStore(storage: Storage) {
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
}

// Infer the `RootState` and `AppDispatch` types from the store itself
type StoreType = ReturnType<typeof createStore>["store"]
export type AppState = ReturnType<StoreType["getState"]>
export type AppDispatch = StoreType["dispatch"];