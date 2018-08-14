import produce from "immer";

import { createReducer } from "utils/reducerUtils";
import { ADD_SHIFT, UPDATE_SHIFT, REMOVE_SHIFT } from "./constants";

const initialState = {
  byId: {},
  allIds: []
};

const addShift = (state, { payload: { id, date, shiftTypeId } }) =>
  produce(state, draft => {
    draft.byId[id] = {
      ...draft.byId[id],
      timestamp: date.getTime(),
      shiftTypeId: shiftTypeId
    };
    draft.allIds.push(id);
  });

const updateShift = (state, { payload: { id, shiftTypeId } }) =>
  produce(state, draft => {
    draft.byId[id] = {
      ...draft.byId[id],
      shiftTypeId: shiftTypeId
    };
  });

const removeShift = (state, { payload: { id } }) =>
  produce(state, draft => {
    delete draft.byId[id];
    draft.allIds = draft.allIds.filter(shiftId => shiftId !== id);
  });

export default createReducer(initialState, {
  [ADD_SHIFT]: addShift,
  [UPDATE_SHIFT]: updateShift,
  [REMOVE_SHIFT]: removeShift
});
