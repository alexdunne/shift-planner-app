import React from "react";
import PropTypes from "prop-types";
import SwatchesPicker from "react-color/lib/Swatches";

import "./index.css";

const ShiftTypeIndicator = ({
  displayName,
  color,
  isPicking,
  onPickerClicked,
  onColorChanged
}) => (
  <div
    style={{ backgroundColor: color }}
    className="shift-type-indicator"
    onClick={onPickerClicked}
  >
    {displayName}

    {isPicking && (
      <div className="shift-type-indicator__picker-container">
        <SwatchesPicker
          color={color}
          height="400px"
          onChangeComplete={onColorChanged}
        />
      </div>
    )}
  </div>
);

ShiftTypeIndicator.propTypes = {
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isPicking: PropTypes.bool.isRequired,
  onPickerClicked: PropTypes.func.isRequired,
  onColorChanged: PropTypes.func.isRequired
};

export default ShiftTypeIndicator;
