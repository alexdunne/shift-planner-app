import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, fluid }) => {
  if (process.env.NODE_ENV === "development") {
    React.Children.forEach(children, (child, index) => {
      if (child.type.name !== "Row") {
        console.warn(
          `Container should only have Row components as children. Element at index ${index} is not a Row`
        );
      }
    });
  }

  return <div className={`container${fluid ? ":-fluid" : ""}`}>{children}</div>;
};

Container.defaultProps = {
  fluid: true
};

Container.propTypes = {
  fluid: PropTypes.bool
};

export default Container;
