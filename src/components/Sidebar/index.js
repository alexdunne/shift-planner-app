import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./index.css";

class Sidebar extends React.Component {
  render() {
    const { isOpen, onClose } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="sidebar">
          <ul className="list-unstyled">
            <li className="sidebar__link-item">
              <NavLink
                to="/"
                exact={true}
                className="sidebar__link"
                activeClassName="sidebar__link--active"
                onClick={onClose}
              >
                Home
              </NavLink>
            </li>
            <li className="sidebar__link-item">
              <NavLink
                to="/shift-types"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
                onClick={onClose}
              >
                Shift types
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar__overlay" onClick={onClose} />
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Sidebar;
