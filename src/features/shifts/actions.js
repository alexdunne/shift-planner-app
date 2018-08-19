import uuid from "uuid";

import { ADD_SHIFT, UPDATE_SHIFT, REMOVE_SHIFT } from "./constants";

export const updateShiftForDate = ({ shift, date, shiftTypesList }) => {
  if (shiftTypesList.length === 0) {
    return;
  }

  // This date doesn't have a shift so create one.
  // Assign the shift type as the first one in the list.
  if (!shift) {
    return addShift({ date, shiftTypeId: shiftTypesList[0].id });
  }

  // Extract the current shift type index
  const currentIndex = shiftTypesList.findIndex(shiftType => shiftType.id === shift.shiftTypeId);

  // If the current shift type index is the last one in the list remove it
  if (currentIndex + 1 === shiftTypesList.length) {
    return removeShift({ id: shift.id });
  }

  // If none the other cases match then we just need to increment the shift type index
  return updateShift({
    id: shift.id,
    date,
    shiftTypeId: shiftTypesList[currentIndex + 1].id
  });
};

export const addShift = ({ date, shiftTypeId }) => ({
  type: ADD_SHIFT,
  payload: {
    id: uuid.v4(),
    date,
    shiftTypeId
  }
});

export const updateShift = ({ id, shiftTypeId }) => ({
  type: UPDATE_SHIFT,
  payload: {
    id,
    shiftTypeId
  }
});

export const removeShift = ({ id }) => ({
  type: REMOVE_SHIFT,
  payload: {
    id
  }
});
