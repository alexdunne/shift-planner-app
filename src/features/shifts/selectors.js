export const getShiftsList = state => {
  return state.shifts.allIds.map(id => ({
    id,
    ...state.shifts.byId[id]
  }));
};

export const getShiftsByShiftTypeId = (state, props) => {
  return getShiftsList(state).filter(shift => shift.shiftTypeId === props.shiftTypeId);
};

export const getShiftCountByShiftTypeId = (state, props) => {
  return getShiftsByShiftTypeId(state, props).length;
};
