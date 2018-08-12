import React, { Component } from "react";
import PropTypes from "prop-types";
import startOfToday from "date-fns/start_of_today";
import { connect } from "react-redux";
import memoizeOne from "memoize-one";

import AppHeader from "./components/AppHeader";
import { Overview, CalendarDay, MonthPicker, YearPicker } from "./components/Calendar";
import CalendarLockToggle from "./components/CalendarLockToggle";
import { Container, Row, Col } from "./components/Grid";
import ShiftTypeIndicator from "./components/ShiftTypeIndicator";
import ShiftTypeEditor from "./components/ShiftTypeEditor";
import { addShift, updateShift, removeShift } from "./features/shifts/actions";
import { getShiftsList } from "./features/shifts/selectors";
import { updateShiftType } from "./features/shiftTypes/actions";
import { getShiftTypesList, getShiftTypesById } from "./features/shiftTypes/selector";
import { SHIFT_STORAGE_KEY } from "./utils/constants";

import "./App.css";

class App extends Component {
  state = {
    locked: true,
    todayTimestamp: startOfToday().getTime(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    shifts: {},
    editingShiftTypeId: null
  };

  componentDidMount() {
    const shifts = localStorage.getItem(SHIFT_STORAGE_KEY);

    if (shifts) {
      this.setState({ shifts: JSON.parse(shifts) });
    }
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

  handleToggleLock = () => {
    this.setState({ locked: !this.state.locked });
  };

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
    const { locked, month, year, dayHeaders, todayTimestamp, editingShiftTypeId } = this.state;
    const { shiftsList, shiftTypesList, shiftTypesById } = this.props;

    const shifts = this.getShiftsForMonthAndYear(shiftsList, month, year);

    const editingShiftType = shiftTypesById[editingShiftTypeId];

    return (
      <main className="app">
        <section>
          <AppHeader locked={locked} onToggleLocked={this.handleToggleLock} />

          <Container className="calendar app-container">
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

            <Row className="mb-3">{dayHeaders.map(day => <Col key={day}>{day}</Col>)}</Row>

            <Row>
              <Col className="px-1">
                <Overview
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
        </section>

        <CalendarLockToggle locked={locked} onToggle={this.handleToggleLock} />

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
      </main>
    );
  }
}

App.propTypes = {
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
)(App);
