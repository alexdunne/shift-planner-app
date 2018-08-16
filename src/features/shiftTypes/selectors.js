export const getShiftTypesList = state => {
  return state.shiftTypes.allIds.map(id => ({
    id,
    ...state.shiftTypes.byId[id]
  }));
};

export const getShiftTypeById = (state, props) => ({
  id: props.shiftTypeId,
  ...state.shiftTypes.byId[props.shiftTypeId]
});

export const getShiftTypesById = state => {
  return state.shiftTypes.byId;
};
