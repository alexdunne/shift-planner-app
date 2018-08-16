import React, { Component } from "react";
import PropTypes from "prop-types";
import startOfToday from "date-fns/start_of_today";
import { connect } from "react-redux";
import memoizeOne from "memoize-one";

import Button from "components/Button";
import { MonthOverview, CalendarDay, MonthPicker, YearPicker } from "components/Calendar";
import { Container, Row, Col } from "components/Grid";
import ShiftTypeIndicator from "components/ShiftTypeIndicator";
import ShiftTypeEditor from "components/ShiftTypeEditor";
import { addShift, updateShift, removeShift } from "features/shifts/actions";
import { getShiftsList } from "features/shifts/selectors";
import { updateShiftType } from "features/shiftTypes/actions";
import { getShiftTypesList, getShiftTypesById } from "features/shiftTypes/selectors";

import "./index.css";

class OverviewScreen extends Component {
  constructor(props) {
    super(props);

    const now = startOfToday();

    this.state = {
      locked: true,
      todayTimestamp: now.getTime(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      editingShiftTypeId: null
    };
  }

  getShiftsForMonthAndYear = memoizeOne((shiftsList, month, year) => {
    return shiftsList.reduce((acc, shift) => {
      const date = new Date(shift.timestamp);

      if (date.getMonth() + 1 === month && date.getFullYear() === year) {
        acc[shift.timestamp] = shift;
      }

      return acc;
    }, {});
  });

  handleDayClicked = (shift, date) => {
    const { shiftTypesList } = this.props;

    if (shiftTypesList.length === 0) {
      return;
    }

    if (!shift) {
      this.props.onAddShift({ date, shiftTypeId: shiftTypesList[0].id });
      return;
    }

    const currentShiftTypeIndex = shiftTypesList.findIndex(
      shiftType => shiftType.id === shift.shiftTypeId
    );

    if (currentShiftTypeIndex + 1 === shiftTypesList.length) {
      this.props.onRemoveShift({ id: shift.id });
      return;
    }

    const newShiftTypeIndex = currentShiftTypeIndex + 1;

    this.props.onUpdateShift({
      id: shift.id,
      date,
      shiftTypeId: shiftTypesList[newShiftTypeIndex].id
    });
  };

  render() {
    const { locked, month, year, todayTimestamp, editingShiftTypeId } = this.state;
    const { shiftsList, shiftTypesList, shiftTypesById } = this.props;

    const dayHeaders = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const shifts = this.getShiftsForMonthAndYear(shiftsList, month, year);
    const editingShiftType = shiftTypesById[editingShiftTypeId];

    return (
      <React.Fragment>
        <section className="overview-screen fill-height">
          <Container className="calendar overview-screen-container">
            <Row className="mb-2">
              {shiftTypesList.map(shiftType => (
                <Col key={shiftType.id} span={6} className="mb-2">
                  <ShiftTypeIndicator
                    displayName={shiftType.displayName}
                    color={shiftType.color}
                    onStartEditing={() => this.setState({ editingShiftTypeId: shiftType.id })}
                  />
                </Col>
              ))}
            </Row>

            <Row className="mb-4">
              <Col span={6}>
                <MonthPicker
                  onChange={({ value }) => {
                    this.setState({ month: value });
                  }}
                  value={month}
                />
              </Col>

              <Col span={6}>
                <YearPicker
                  onChange={({ value }) => {
                    this.setState({ year: value });
                  }}
                  value={year}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              {dayHeaders.map(day => (
                <Col key={day}>{day}</Col>
              ))}
            </Row>

            <Row>
              <Col className="px-1">
                <MonthOverview
                  month={month}
                  year={year}
                  renderDay={({ date }) => {
                    const shift = date ? shifts[date.getTime()] : null;
                    const shiftType = shift ? shiftTypesById[shift.shiftTypeId] : null;

                    return (
                      <CalendarDay
                        date={date}
                        backgroundColor={shiftType && shiftType.color}
                        isToday={date && date.getTime() === todayTimestamp}
                        onClick={() => !locked && this.handleDayClicked(shift, date)}
                      />
                    );
                  }}
                />
              </Col>
            </Row>
          </Container>

          <Button
            style={{ backgroundColor: locked ? "#E4165C" : "#8BC34A" }}
            onClick={() => {
              this.setState({ locked: !this.state.locked });
            }}
          >
            {locked ? "Unlock" : "Editing"}
          </Button>
        </section>

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
      </React.Fragment>
    );
  }
}

OverviewScreen.propTypes = {
  shiftsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      shiftTypeId: PropTypes.string.isRequired
    })
  ),
  shiftTypesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired,
  shiftTypesById: PropTypes.object.isRequired,
  onAddShift: PropTypes.func.isRequired,
  onUpdateShift: PropTypes.func.isRequired,
  onRemoveShift: PropTypes.func.isRequired,
  onUpdateShiftType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  shiftsList: getShiftsList(state),
  shiftTypesList: getShiftTypesList(state),
  shiftTypesById: getShiftTypesById(state)
});

const mapDispatchToProps = {
  onAddShift: addShift,
  onUpdateShift: updateShift,
  onRemoveShift: removeShift,
  onUpdateShiftType: updateShiftType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewScreen);
