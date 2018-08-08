import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const ShiftTypeIndicator = ({ displayName, color }) => (
  <div style={{ color }} className="shift-type-indicator">
    {displayName}
  </div>
);

ShiftTypeIndicator.propTypes = {
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default ShiftTypeIndicator;
