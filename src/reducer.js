import { combineReducers } from "redux";

import sessionReducer from "features/session/reducer";
import shiftsReducer from "features/shifts/reducer";
import shiftsTypeReducer from "features/shiftTypes/reducer";

export default combineReducers({
  session: sessionReducer,
  shifts: shiftsReducer,
  shiftTypes: shiftsTypeReducer
});
