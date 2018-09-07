import React from "react";
import PropTypes from "prop-types";
import SwatchesPicker from "react-color/lib/Swatches";
import ReactModal from "react-modal";

import "./index.css";

const style = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  content: {
    top: "10vh",
    bottom: "10vh",
    padding: 0,
    borderRadius: "0",
    border: "none",
    left: "calc(50vw - 185px)",
    maxWidth: "370px"
  }
};

class ShiftTypeEditor extends React.Component {
  state = {
    newDisplayName: this.props.displayName,
    newColor: this.props.color
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({
        newColor: this.props.color,
        newDisplayName: this.props.displayName
      });
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

    if (!newDisplayName || newDisplayName.length === 0) {
      return;
    }

    if (!newColor || newColor.length === 0) {
      return;
    }

    this.props.onSave({
      color: newColor,
      displayName: newDisplayName
    });
  };

  render() {
    const { newColor, newDisplayName } = this.state;
    const { isOpen, onRequestClose } = this.props;

    return (
      <ReactModal isOpen={isOpen} style={style} onRequestClose={onRequestClose}>
        {isOpen && (
          <div className="shift-type-editor__config-container">
            <input
              type="text"
              placeholder="Enter a shift type name"
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
        )}
      </ReactModal>
    );
  }
}

ShiftTypeEditor.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  color: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ShiftTypeEditor;
