import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const Container = ({ children, fluid, className }) => {
  if (process.env.NODE_ENV === "development") {
    React.Children.forEach(children, (child, index) => {
      if (child.type.name !== "Row") {
        console.warn(
          `Container should only have Row components as children. Element at index ${index} is not a Row`
        );
      }
    });
  }

  return (
    <div className={`container${fluid ? "-fluid" : ""} ${className}`}>
      {children}
    </div>
  );
};

Container.defaultProps = {
  fluid: true,
  className: ""
};

Container.propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string
};

export default Container;
