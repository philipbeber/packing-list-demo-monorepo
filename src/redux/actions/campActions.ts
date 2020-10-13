import { Camp, Item, ItemState, List } from "../../model";

export interface IOpenCampAction {
  readonly type: "OPEN_CAMP";
  payload: string;
}

export interface ICloseCampAction {
  readonly type: "CLOSE_CAMP";
}

export interface ICreateCampAction {
  readonly type: "CREATE_CAMP";
  payload: {
    camp: Camp;
    navigateTo: boolean;
  };
}

export interface ICreateCampListAction {
  readonly type: "CREATE_CAMP_LIST";
  payload: {
    campId: string;
    list: List;
  };
}

export interface IOpenCampListAction {
  readonly type: "OPEN_CAMP_LIST";
  payload: string;
}

export interface ICloseCampListAction {
  readonly type: "CLOSE_CAMP_LIST";
}

export interface ICreateCampItemAction {
  readonly type: "CREATE_CAMP_ITEM";
  payload: {
    campId: string;
    listId: string;
    item: Item;
  };
}

export interface IChangeCampItemStateAction {
  readonly type: "CHANGE_CAMP_ITEM_STATE";
  payload: {
    campId: string;
    listId: string;
    itemIds: string[];
    state: ItemState;
  };
}

export interface IChangeCampItemDeletedAction {
  readonly type: "CHANGE_CAMP_ITEM_DELETED";
  payload: {
    campId: string;
    listId: string;
    itemIds: string[];
    deleted: boolean;
  };
}

export interface IClearCampDataAction {
  readonly type: "CLEAR_CAMP_DATA";
}

export type CampActions =
  | IOpenCampAction
  | ICloseCampAction
  | ICreateCampAction
  | ICreateCampListAction
  | IOpenCampListAction
  | ICloseCampListAction
  | ICreateCampItemAction
  | IClearCampDataAction
  | IChangeCampItemStateAction
  | IChangeCampItemDeletedAction;
