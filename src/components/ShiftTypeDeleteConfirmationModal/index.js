import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactModal from "react-modal";

import Button from "components/Button";
import Icon from "components/Icon/Icon";
import { getShiftCountByShiftTypeId } from "features/shifts/selectors";
import { removeShiftType } from "features/shiftTypes/actions";
import { getShiftTypeById } from "features/shiftTypes/selectors";

import "./index.css";

const style = {
  content: {
    top: "20vh",
    bottom: "20vh",
    padding: 0
  }
};

const ShiftTypeDeleteConfirmationModal = ({
  isOpen,
  onRequestClose,
  shiftType,
  associatedShiftsCount,
  onRemoveShiftType
}) => (
  <ReactModal isOpen={isOpen} style={style} onRequestClose={onRequestClose}>
    {shiftType && (
      <div className="modal">
        <div className="modal__icon">
          <Icon name="Trash" containerStyles={{ border: "1px solid #FFFFFF" }} />
        </div>
        <div className="modal__container">
          <h1 className="modal__title">Delete confirmation</h1>

          <div className="modal__content">
            <p>
              Are you sure you want to delete the{" "}
              <span className="bold text-upper">{shiftType.displayName}</span> shift type?
            </p>

            <p>
              There {associatedShiftsCount !== 1 ? "are" : "is"}{" "}
              <span className="bold">{associatedShiftsCount}</span> shift
              {associatedShiftsCount !== 1 ? "s" : ""} with this shift type.
            </p>
          </div>

          <Button
            className="modal__button"
            onClick={() => {
              onRemoveShiftType(shiftType.id);
              onRequestClose();
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    )}
  </ReactModal>
);

ShiftTypeDeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  shiftTypeId: PropTypes.string,
  shiftType: PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    color: PropTypes.string
  }),
  associatedShiftsCount: PropTypes.number.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onRemoveShiftType: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  shiftType: getShiftTypeById(state, props),
  associatedShiftsCount: getShiftCountByShiftTypeId(state, props)
});

const mapDispatchToProps = dispatch => ({
  onRemoveShiftType: id => dispatch(removeShiftType({ id }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiftTypeDeleteConfirmationModal);
