import uuid from "uuid";

import { ADD_SHIFT, UPDATE_SHIFT, REMOVE_SHIFT } from "./constants";
import { SHIFT_STORAGE_KEY } from "../../utils/constants";

export const addShift = ({ date, shiftTypeId }) => ({
  type: ADD_SHIFT,
  payload: {
    id: uuid.v4(),
    date,
    shiftTypeId
  },
  meta: {
    storage: {
      localStorageKey: SHIFT_STORAGE_KEY,
      localStorageDataPath: "shifts"
    }
  }
});

export const updateShift = ({ id, shiftTypeId }) => ({
  type: UPDATE_SHIFT,
  payload: {
    id,
    shiftTypeId
  },
  meta: {
    storage: {
      localStorageKey: SHIFT_STORAGE_KEY,
      localStorageDataPath: "shifts"
    }
  }
});

export const removeShift = ({ id }) => ({
  type: REMOVE_SHIFT,
  payload: {
    id
  },
  meta: {
    storage: {
      localStorageKey: SHIFT_STORAGE_KEY,
      localStorageDataPath: "shifts"
    }
  }
});
