import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { auth } from "config/firebase";

import "./index.css";

class Sidebar extends React.Component {
  render() {
    const { isOpen, onClose } = this.props;

    return (
      <React.Fragment>
        <div className={`sidebar ${isOpen ? "sidebar--active" : ""}`}>
          <ul className="list-unstyled">
            <li className="sidebar__link-item">
              <NavLink
                to="/"
                exact={true}
                className="sidebar__link"
                activeClassName="sidebar__link--active"
                onClick={onClose}
              >
                <div>Home</div>
              </NavLink>
            </li>
            <li className="sidebar__link-item">
              <NavLink
                to="/shift-types"
                className="sidebar__link"
                activeClassName="sidebar__link--active"
                onClick={onClose}
              >
                <div>Shift types</div>
              </NavLink>
            </li>
            <li>
              <a className="sidebar__link" onClick={auth.signInAnonymously}>
                <div>Login</div>
              </a>
            </li>
          </ul>

          <div className="sidebar__icon-attribution-container">
            <span>
              Icons provided by{" "}
              <a
                href="https://fontawesome.com/license"
                className="sidebar__icon-attribution"
                target="_blank"
                rel="noopener noreferrer"
              >
                fontawesome
              </a>
            </span>
          </div>
        </div>
        <div
          className={`sidebar__overlay ${isOpen ? "sidebar__overlay--active" : ""}`}
          onClick={onClose}
        />
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Sidebar;
