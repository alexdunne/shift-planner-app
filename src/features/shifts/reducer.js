import produce from "immer";

import { createReducer } from "utils/reducerUtils";
import { ADD_SHIFT, UPDATE_SHIFT, REMOVE_SHIFT } from "./constants";
import { REMOVE_SHIFT_TYPE } from "features/shiftTypes/constants";

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

const removeAllWithShiftType = (state, { payload: { id: shiftTypeId } }) =>
  produce(state, draft => {
    // Loop through all of the ids, find the shifts that have the shiftTypeId provided
    // and remove them from both the allIds list and the byId map

    const remainingList = [];
    const remainingMap = {};

    state.allIds.forEach(id => {
      const shift = state.byId[id];

      if (shift.shiftTypeId !== shiftTypeId) {
        remainingList.push(id);
        remainingMap[id] = shift;
      }
    });

    console.log(remainingList, remainingMap);

    draft.allIds = remainingList;
    draft.byId = remainingMap;
  });

export default createReducer(initialState, {
  [ADD_SHIFT]: addShift,
  [UPDATE_SHIFT]: updateShift,
  [REMOVE_SHIFT]: removeShift,
  [REMOVE_SHIFT_TYPE]: removeAllWithShiftType
});
