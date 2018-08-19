import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "components/Button";
import { Container, Row, Col } from "components/Grid";
import Icon from "components/Icon/Icon";
import ShiftTypeDeleteConfirmationModal from "components/ShiftTypeDeleteConfirmationModal";
import ShiftTypeEditor from "components/ShiftTypeEditor";
import ShiftTypeIndicator from "components/ShiftTypeIndicator";
import { addShiftType, updateShiftType, removeShiftType } from "features/shiftTypes/actions";
import { getShiftTypesList, getShiftTypesById } from "features/shiftTypes/selectors";

import "./index.css";

class ShiftTypesScreen extends React.Component {
  state = {
    addingNewShiftType: false,
    editingShiftTypeId: null,
    deletingShiftTypeId: null
  };

  handleAddNewShiftTypeClicked = () => {
    this.setState({ addingNewShiftType: true });
  };

  render() {
    const { shiftTypes, shiftTypesById } = this.props;
    const { addingNewShiftType, editingShiftTypeId, deletingShiftTypeId } = this.state;

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
                    onClick={() => this.setState({ deletingShiftTypeId: shiftType.id })}
                  >
                    <Icon name="Trash" size="sm" backgroundColor="#2e3e4f" iconColour="#FF0000" />
                  </div>
                </div>
              </Col>
            ))}
            <Col>
              <Button
                className="shift-types-screen__add"
                disabled={shiftTypes.length === 6}
                onClick={this.handleAddNewShiftTypeClicked}
              >
                Add new
              </Button>
            </Col>
          </Row>
        </Container>

        <ShiftTypeEditor
          isOpen={!!editingShiftTypeId}
          color={editingShiftType && editingShiftType.color}
          displayName={editingShiftType && editingShiftType.displayName}
          onSave={config => {
            this.props.onUpdateShiftType({ id: editingShiftTypeId, config });
            this.setState({ editingShiftTypeId: null });
          }}
          onRequestClose={() => this.setState({ editingShiftTypeId: null })}
        />

        <ShiftTypeEditor
          isOpen={addingNewShiftType}
          color="#0187d1"
          displayName=""
          onSave={config => {
            this.props.onAddShiftType({ config });
            this.setState({ addingNewShiftType: false });
          }}
          onRequestClose={() => this.setState({ addingNewShiftType: false })}
        />

        <ShiftTypeDeleteConfirmationModal
          isOpen={!!deletingShiftTypeId}
          shiftTypeId={deletingShiftTypeId}
          onRequestClose={() => this.setState({ deletingShiftTypeId: null })}
        />
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
