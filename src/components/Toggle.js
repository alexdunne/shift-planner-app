import React from "react";
import PropTypes from "prop-types";

class Toggle extends React.Component {
  state = {
    on: this.props.defaultOn
  };

  handleToggle = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return this.props.children({ on: this.state.on, onToggle: this.handleToggle });
  }
}

Toggle.defaultProps = {
  defaultOn: false
};

Toggle.propTypes = {
  defaultOn: PropTypes.bool
};

export default Toggle;
