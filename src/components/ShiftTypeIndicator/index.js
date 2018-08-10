import React from "react";
import PropTypes from "prop-types";
import { TwitterPicker } from "react-color";

import "./index.css";

class ShiftTypeIndicator extends React.Component {
  state = {
    showColorPicker: false
  };

  handleToggleColourPicker;

  render() {
    const { displayName, color, onColorChange } = this.props;
    const { showColorPicker } = this.state;

    return (
      <div
        style={{ backgroundColor: color }}
        className="shift-type-indicator"
        onClick={() => this.setState({ showColorPicker: !showColorPicker })}
      >
        {displayName}

        {showColorPicker && (
          <div className="shift-type-indicator__picker-container">
            <TwitterPicker color={color} onChangeComplete={onColorChange} />
          </div>
        )}
      </div>
    );
  }
}

ShiftTypeIndicator.propTypes = {
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired
};

export default ShiftTypeIndicator;
