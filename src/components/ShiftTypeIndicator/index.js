import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const ShiftTypeIndicator = ({ displayName, color, onStartEditing }) => (
  <div
    style={{ backgroundColor: color }}
    className="shift-type-indicator"
    onClick={onStartEditing}
  >
    {displayName}
  </div>
);

ShiftTypeIndicator.propTypes = {
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onStartEditing: PropTypes.func.isRequired
};

export default ShiftTypeIndicator;
