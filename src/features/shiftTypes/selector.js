export const getShiftTypesList = state => {
  return state.shiftTypes.allIds.map(id => ({
    id,
    ...state.shiftTypes.byId[id]
  }));
};

export const getShiftTypesById = state => {
  return state.shiftTypes.byId;
};
