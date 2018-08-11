import React from "react";
import PropTypes from "prop-types";
import SwatchesPicker from "react-color/lib/Swatches";

import "./index.css";

class ShiftTypeEditor extends React.Component {
  state = {
    newDisplayName: this.props.displayName,
    newColor: this.props.color
  };

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

  handleCancelPressed = () => {
    this.props.onCancel();
  };

  render() {
    const { newColor, newDisplayName } = this.state;
    return (
      <div>
        <div className="shift-type-editor__container">
          <div
            className="shift-type-editor__overlay"
            onClick={this.handleSavePressed}
          />

          <div className="shift-type-editor__config-container">
            <input
              type="text"
              placeholder="Shift type name"
              className="shift-type-editor__name"
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
              className="shift-type-editor__save"
              style={{ backgroundColor: newColor }}
              onClick={this.handleSavePressed}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ShiftTypeEditor.propTypes = {
  displayName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ShiftTypeEditor;
