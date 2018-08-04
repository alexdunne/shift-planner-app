import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Row = ({ children, alignItems, justifyContent, className }) => {
  const classes = classnames([
    "row",
    `align-items-${alignItems}`,
    `justify-content-${justifyContent}`,
    className
  ]);

  return <div className={classes}>{children}</div>;
};

Row.defaultProps = {
  alignItems: "start",
  justifyContent: "start",
  className: ""
};

Row.propTypes = {
  alignItems: PropTypes.oneOf(["start", "center", "end"]),
  justifyContent: PropTypes.oneOf(["start", "center", "end"]),
  className: PropTypes.string
};

export default Row;
