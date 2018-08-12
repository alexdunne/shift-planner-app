import uuid from "uuid";

import { ADD_SHIFT_TYPE, REMOVE_SHIFT_TYPE, UPDATE_SHIFT_TYPE } from "./constants";

export const addShiftType = ({ config }) => ({
  type: ADD_SHIFT_TYPE,
  payload: {
    id: uuid.v4(),
    config
  }
});

export const updateShiftType = ({ id, config }) => ({
  type: UPDATE_SHIFT_TYPE,
  payload: {
    id,
    config
  }
});

export const removeShiftType = ({ id }) => ({
  type: REMOVE_SHIFT_TYPE,
  payload: {
    id
  }
});
