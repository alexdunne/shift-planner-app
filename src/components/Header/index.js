import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const Header = ({ left, right }) => (
  <header className="Header">
    <div>{left}</div>
    <div>Shift planner</div>
    <div>{right}</div>
  </header>
);

Header.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node
};

export default Header;
