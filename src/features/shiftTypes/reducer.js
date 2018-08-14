import produce from "immer";

import { createReducer } from "utils/reducerUtils";
import { ADD_SHIFT_TYPE, REMOVE_SHIFT_TYPE, UPDATE_SHIFT_TYPE } from "./constants";

const initialState = { byId: {}, allIds: [] };

const addShiftType = (state, { payload: { id, config } }) =>
  produce(state, draft => {
    draft.byId[id] = { ...config };
    draft.allIds.push(id);
  });

const removeShiftType = (state, { payload: { id } }) =>
  produce(state, draft => {
    delete draft.byId[id];
    draft.allIds = draft.allIds.filter(shiftTypeId => id !== shiftTypeId);
  });

const updateShiftType = (state, { payload: { id, config } }) =>
  produce(state, draft => {
    draft.byId[id] = { ...config };
  });

export default createReducer(initialState, {
  [ADD_SHIFT_TYPE]: addShiftType,
  [REMOVE_SHIFT_TYPE]: removeShiftType,
  [UPDATE_SHIFT_TYPE]: updateShiftType
});
