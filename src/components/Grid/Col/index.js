import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Col = ({ children, className, span, ...rest }) => {
  const classes = classnames([className, `col${span ? "-" + span : ""}`]);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

Col.propTypes = {
  className: PropTypes.string,
  span: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
};

export default Col;
