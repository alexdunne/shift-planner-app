import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col } from "../Grid";
import Icon from "../Icon/Icon";

import "./index.css";

const AppHeader = ({ locked, onToggleLocked }) => (
  <header className="app-header">
    <Container>
      <Row alignItems="center">
        <Col span={2}>
          {
            <Icon
              name={locked ? "LockedLock" : "Edit"}
              size="xs"
              backgroundColor={locked ? "#F44336" : "#4CAF50"}
              iconColour="#FFFFFF"
              onPress={onToggleLocked}
            />
          }
        </Col>
        <Col span={8}>{<div className="text-center">Shift planner</div>}</Col>
        <Col span={2} />
      </Row>
    </Container>
  </header>
);

AppHeader.propTypes = {
  locked: PropTypes.bool.isRequired,
  onToggleLocked: PropTypes.func.isRequired
};

export default AppHeader;
