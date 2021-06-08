import { CampOperations } from "../../model";

export const openCamp = (campId: string): {
  readonly type: "OPEN_CAMP",
  payload: string;
} => ({
  type: "OPEN_CAMP",
  payload: campId,
});

export const closeCamp = (): {
  readonly type: "CLOSE_CAMP"
} => ({
  type: "CLOSE_CAMP",
});

export const sendUserOperation = (operation: CampOperations): {
  readonly type: "USER_OPERATION"
  payload: CampOperations;
} => ({
  type: "USER_OPERATION",
  payload: operation,
});

export const openCampList = (
  campId: string,
  listId: string
): {
  readonly type: "OPEN_CAMP_LIST"
  payload: {
    campId: string;
    listId: string;
  };
} => ({
  type: "OPEN_CAMP_LIST",
  payload: { campId, listId },
});

export const closeCampList = (): {
  readonly type: "CLOSE_CAMP_LIST"
} => ({
  type: "CLOSE_CAMP_LIST",
});

export const clearCampData = (): {
  readonly type: "CLEAR_CAMP_DATA"
} => ({
  type: "CLEAR_CAMP_DATA",
});

export type CampActions =
  | ReturnType<typeof openCamp>
  | ReturnType<typeof closeCamp>
  | ReturnType<typeof sendUserOperation>
  | ReturnType<typeof openCampList>
  | ReturnType<typeof closeCampList>
  | ReturnType<typeof clearCampData>;;
