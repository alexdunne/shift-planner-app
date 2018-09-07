import { createReducer } from "utils/reducerUtils";
import { ADD_SHIFT_TYPE, REMOVE_SHIFT_TYPE, UPDATE_SHIFT_TYPE } from "./constants";

const initialState = { byId: {}, allIds: [] };

const addShiftType = (state, { payload: { id, config } }) => ({
  ...state,
  byId: {
    ...state.byId,
    [id]: { ...config }
  },
  allIds: state.allIds.concat(id)
});

const removeShiftType = (state, { payload: { id } }) => {
  const { [id]: value, ...stateWithRemovedId } = state.byId;

  return {
    ...state,
    byId: stateWithRemovedId,
    allIds: state.allIds.filter(shiftTypeId => shiftTypeId !== id)
  };
};

const updateShiftType = (state, { payload: { id, config } }) => ({
  ...state,
  byId: {
    ...state.byId,
    [id]: { ...config }
  }
});

export default createReducer(initialState, {
  [ADD_SHIFT_TYPE]: addShiftType,
  [REMOVE_SHIFT_TYPE]: removeShiftType,
  [UPDATE_SHIFT_TYPE]: updateShiftType
});
