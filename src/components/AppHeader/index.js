import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "components/Grid";
import Icon from "components/Icon/Icon";

import "./index.css";

const AppHeader = ({ onToggleSidebar }) => (
  <header className="app-header">
    <div className="app-container">
      <Row alignItems="center">
        <Col span={2}>
          <div onClick={onToggleSidebar}>
            <Icon name="Hamburger" size="xs" backgroundColor="#03A9F4" iconColour="#FFFFFF" />
          </div>
        </Col>
        <Col span={8}>{<div className="text-center">Shift Planner</div>}</Col>
        <Col span={2}>
          {
            <div className="float-right">
              <a
                href="https://github.com/alexdunne/shift-planner-app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to the shift planner github repository"
              >
                <Icon name="Github" size="xs" backgroundColor="#03A9F4" iconColour="#FFFFFF" />
              </a>
            </div>
          }
        </Col>
      </Row>
    </div>
  </header>
);

AppHeader.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired
};

export default AppHeader;
