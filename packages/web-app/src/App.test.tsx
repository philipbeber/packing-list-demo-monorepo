import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer, campReducer } from "packing-list-shared";

const store = configureStore({
  reducer: combineReducers({
    camp: campReducer,
    user: userReducer
  })
});

test("renders learn react link", () => {
  const app = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = app.getAllByText(/Create a camp/i);
  expect(linkElement.length).toBe(2);
});
