import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col } from "../Grid";

import "./index.css";

const Header = ({ left, center, right }) => (
  <header className="header">
    <Container>
      <Row alignItems="center">
        <Col>{left}</Col>
        <Col>{center}</Col>
        <Col>{right}</Col>
      </Row>
    </Container>
  </header>
);

Header.propTypes = {
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node
};

export default Header;
