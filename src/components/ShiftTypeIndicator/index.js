import React from "react";
import PropTypes from "prop-types";
import SwatchesPicker from "react-color/lib/Swatches";

import "./index.css";

class ShiftTypeIndicator extends React.Component {
  state = {
    newDisplayName: this.props.displayName,
    newColor: this.props.color
  };

  componentDidUpdate(prevProps) {
    if (prevProps.displayName !== this.props.displayName) {
      this.setState({ newDisplayName: this.props.displayName });
    }

    if (prevProps.color !== this.props.color) {
      this.setState({ newColor: this.props.color });
    }
  }

  handleColorChange = color => {
    this.setState({ newColor: color.hex });
  };

  handleDisplayNameChange = event => {
    this.setState({ newDisplayName: event.target.value });
  };

  handleSavePressed = () => {
    const { newDisplayName, newColor } = this.state;

    this.props.onSave({
      color: newColor,
      displayName: newDisplayName
    });
  };

  render() {
    const { newDisplayName, newColor } = this.state;
    const { displayName, color, isEditing, onStartEditing } = this.props;

    return (
      <React.Fragment>
        <div
          style={{ backgroundColor: color }}
          className="shift-type-indicator"
          onClick={onStartEditing}
        >
          {displayName}
        </div>

        <div>
          {isEditing && (
            <div className="shift-type-indicator__container">
              <div className="shift-type-indicator__overlay" />

              <div className="shift-type-indicator__config-container">
                <input
                  type="text"
                  className="shift-type-indicator__name-input"
                  value={newDisplayName}
                  onChange={this.handleDisplayNameChange}
                />

                <SwatchesPicker
                  color={newColor}
                  width="100%"
                  height="65vh"
                  onChangeComplete={this.handleColorChange}
                />

                <button
                  className="shift-type-indicator__save"
                  style={{ backgroundColor: newColor }}
                  onClick={this.handleSavePressed}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ShiftTypeIndicator.propTypes = {
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ShiftTypeIndicator;
