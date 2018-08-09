import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const CalendarLockToggle = ({ locked, onToggle }) => (
  <button
    className="calendar-lock-toggle ripple"
    style={{ backgroundColor: locked ? "#E4165C" : "#38843D" }}
    onClick={onToggle}
  >
    {locked ? "Unlock" : "Editing"}
  </button>
);

CalendarLockToggle.propTypes = {
  locked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default CalendarLockToggle;
