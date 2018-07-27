import React from "react";
import PropTypes from "prop-types";

const Header = ({ left, right }) => (
  <header>
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
