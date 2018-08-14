import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Container, Row, Col } from "components/Grid";
import ShiftTypeIndicator from "components/ShiftTypeIndicator";
import { getShiftTypesList } from "features/shiftTypes/selector";

const ShiftTypesScreen = ({ shiftTypes }) => (
  <Container>
    <Row className="mb-2">
      {shiftTypes.map(shiftType => (
        <Col key={shiftType.id} className="mb-2">
          <ShiftTypeIndicator
            displayName={shiftType.displayName}
            color={shiftType.color}
            onStartEditing={() => {}}
          />
        </Col>
      ))}
    </Row>
  </Container>
);

ShiftTypesScreen.propTypes = {
  shiftTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  )
};

const mapStateToProps = state => ({
  shiftTypes: getShiftTypesList(state)
});

export default connect(mapStateToProps)(ShiftTypesScreen);
