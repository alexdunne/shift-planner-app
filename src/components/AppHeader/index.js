import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "../Grid";
import Icon from "../Icon/Icon";

import "./index.css";

const AppHeader = ({ locked, onToggleLocked }) => (
  <header className="app-header">
    <div className="app-container">
      <Row alignItems="center">
        <Col span={2}>
          {
            <Icon
              name={locked ? "LockedLock" : "Edit"}
              size="xs"
              backgroundColor={locked ? "#E4165C" : "#8BC34A"}
              iconColour="#FFFFFF"
              onPress={onToggleLocked}
            />
          }
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
                <Icon
                  name="Github"
                  size="xs"
                  backgroundColor="#03A9F4"
                  iconColour="#FFFFFF"
                />
              </a>
            </div>
          }
        </Col>
      </Row>
    </div>
  </header>
);

AppHeader.propTypes = {
  locked: PropTypes.bool.isRequired,
  onToggleLocked: PropTypes.func.isRequired
};

export default AppHeader;
