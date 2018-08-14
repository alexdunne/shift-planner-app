import React from "react";
import { Link } from "react-router-dom";

import { Row, Col } from "components/Grid";
import Icon from "components/Icon/Icon";

import "./index.css";

const AppHeader = () => (
  <header className="app-header">
    <div className="app-container">
      <Row alignItems="center">
        <Col span={2}>
          <Link to="/shift-types">
            <Icon name="Hamburger" size="xs" backgroundColor="#03A9F4" iconColour="#FFFFFF" />
          </Link>
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

export default AppHeader;
