import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { AppState, useAppDispatch } from "..";
import { useSelector } from "react-redux";
import { container } from "tsyringe";
import { Components } from "../dependencies/components";

const campListSelector = createSelector(
  (state: AppState) => state.camp.camps,
  (camps) =>
    camps.map((camp) => ({
      id: camp.id,
      name: camp.name,
    }))
);

const FooBar: React.FC = () => {
  const campList = useSelector((state: AppState) => campListSelector(state));
  const [createCampOpen, setCreateCampOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const campDispatch = useAppDispatch();

  const components = container.resolve(Components);

  return <components.Text>foo bar</components.Text>;
};

export default FooBar;
