import { getShiftTypeById } from "features/shiftTypes/selectors";

export const getShifts = state => {
  return state.shifts.allIds.map(id => {
    const shift = state.shifts.byId[id];

    return {
      id,
      date: new Date(shift.timestamp),
      shiftType: getShiftTypeById(state, { shiftTypeId: shift.shiftTypeId }),
      ...shift
    };
  });
};

export const getShiftsByShiftTypeId = (state, props) => {
  return getShifts(state).filter(shift => shift.shiftTypeId === props.shiftTypeId);
};

export const getShiftCountByShiftTypeId = (state, props) => {
  return getShiftsByShiftTypeId(state, props).length;
};

export const getShiftsForMonthAndYear = (state, props) => {
  const { month, year } = props;

  return getShifts(state).reduce((acc, shift) => {
    if (shift.date.getMonth() + 1 === month && shift.date.getFullYear() === year) {
      acc[shift.timestamp] = shift;
    }

    return acc;
  }, {});
};
