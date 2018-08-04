import React from "react";
import Dropdown from "react-dropdown";
import classnames from "classnames";

import "react-dropdown/style.css";

import "./index.css";

const Picker = ({ controlClassName, ...rest }) => (
  <Dropdown
    {...rest}
    controlClassName={classnames("picker", controlClassName)}
  />
);

export default Picker;
