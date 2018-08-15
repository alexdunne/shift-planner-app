import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Container, Row, Col } from "components/Grid";
import Icon from "components/Icon/Icon";
import ShiftTypeEditor from "components/ShiftTypeEditor";
import ShiftTypeIndicator from "components/ShiftTypeIndicator";
import { addShiftType, updateShiftType, removeShiftType } from "features/shiftTypes/actions";
import { getShiftTypesList, getShiftTypesById } from "features/shiftTypes/selector";

import "./index.css";

class ShiftTypesScreen extends React.Component {
  state = {
    addingNewShiftType: false,
    editingShiftTypeId: null
  };

  handleAddNewShiftTypeClicked = () => {
    this.setState({ addingNewShiftType: true });
  };

  render() {
    const { shiftTypes, shiftTypesById } = this.props;
    const { addingNewShiftType, editingShiftTypeId } = this.state;

    const editingShiftType = shiftTypesById[editingShiftTypeId];

    return (
      <React.Fragment>
        <Container className="shift-types-screen pt-4 fill-height">
          <Row className="mb-2">
            {shiftTypes.map(shiftType => (
              <Col key={shiftType.id} span={12} className="mb-2 text-center">
                <div className="shift-types-screen__row">
                  <div className="shift-types-screen__indicator">
                    <ShiftTypeIndicator
                      displayName={shiftType.displayName}
                      color={shiftType.color}
                      onStartEditing={() => this.setState({ editingShiftTypeId: shiftType.id })}
                    />
                  </div>
                  <div
                    className="shift-types-screen__delete"
                    onClick={() => this.props.onRemoveShiftType({ id: shiftType.id })}
                  >
                    <Icon name="Trash" size="sm" backgroundColor="#2e3e4f" iconColour="#FF0000" />
                  </div>
                </div>
              </Col>
            ))}
            <Col>
              <button onClick={this.handleAddNewShiftTypeClicked}>Add new</button>
            </Col>
          </Row>
        </Container>
        {editingShiftTypeId && (
          <ShiftTypeEditor
            color={editingShiftType.color}
            displayName={editingShiftType.displayName}
            onSave={config => {
              this.props.onUpdateShiftType({ id: editingShiftTypeId, config });
              this.setState({ editingShiftTypeId: null });
            }}
            onCancel={() => this.setState({ editingShiftTypeId: null })}
          />
        )}

        {addingNewShiftType && (
          <ShiftTypeEditor
            color="#0187d1"
            displayName=""
            onSave={config => {
              this.props.onAddShiftType({ config });
              this.setState({ addingNewShiftType: false });
            }}
            onCancel={() => this.setState({ addingNewShiftType: false })}
          />
        )}
      </React.Fragment>
    );
  }
}

ShiftTypesScreen.propTypes = {
  shiftTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  shiftTypesById: PropTypes.object.isRequired,
  onAddShiftType: PropTypes.func.isRequired,
  onUpdateShiftType: PropTypes.func.isRequired,
  onRemoveShiftType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shiftTypes: getShiftTypesList(state),
  shiftTypesById: getShiftTypesById(state)
});

const mapDispatchToProps = {
  onAddShiftType: addShiftType,
  onUpdateShiftType: updateShiftType,
  onRemoveShiftType: removeShiftType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiftTypesScreen);
