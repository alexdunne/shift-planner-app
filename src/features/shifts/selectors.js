export const getShiftsList = state => {
  return state.shifts.allIds.map(id => ({
    id,
    ...state.shifts.byId[id]
  }));
};
