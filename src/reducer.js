import { combineReducers } from "redux";

import shiftsReducer from "features/shifts/reducer";
import shiftsTypeReducer from "features/shiftTypes/reducer";

export default combineReducers({
  shifts: shiftsReducer,
  shiftTypes: shiftsTypeReducer
});
