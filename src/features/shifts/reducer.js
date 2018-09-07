import { createReducer } from "utils/reducerUtils";
import { ADD_SHIFT, UPDATE_SHIFT, REMOVE_SHIFT } from "./constants";
import { REMOVE_SHIFT_TYPE } from "features/shiftTypes/constants";

const initialState = {
  byId: {},
  allIds: []
};

const addShift = (state, { payload: { id, date, shiftTypeId } }) => ({
  ...state,
  byId: {
    ...state.byId,
    [id]: {
      ...state.byId[id],
      timestamp: date.getTime(),
      shiftTypeId: shiftTypeId
    }
  },
  allIds: state.allIds.concat(id)
});

const updateShift = (state, { payload: { id, shiftTypeId } }) => ({
  ...state,
  byId: {
    ...state.byId,
    [id]: {
      ...state.byId[id],
      shiftTypeId
    }
  }
});

const removeShift = (state, { payload: { id } }) => {
  const { [id]: value, ...stateWithRemovedId } = state.byId;

  return {
    ...state,
    byId: stateWithRemovedId,
    allIds: state.allIds.filter(shiftId => shiftId !== id)
  };
};

const removeAllWithShiftType = (state, { payload: { id: shiftTypeId } }) => {
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

  return {
    ...state,
    byId: remainingMap,
    allIds: remainingList
  };
};

export default createReducer(initialState, {
  [ADD_SHIFT]: addShift,
  [UPDATE_SHIFT]: updateShift,
  [REMOVE_SHIFT]: removeShift,
  [REMOVE_SHIFT_TYPE]: removeAllWithShiftType
});
