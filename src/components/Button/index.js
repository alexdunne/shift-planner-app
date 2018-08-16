import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const Button = ({ children, className, ...rest }) => (
  <button className={`button ${className}`} {...rest}>
    {children}
  </button>
);

Button.defaultProps = {
  className: ""
};

Button.propTypes = {
  className: PropTypes.string
};

export default Button;
