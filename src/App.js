import React, { Component } from "react";

import AppHeader from "./components/AppHeader";
import {
  Overview,
  CalendarDay,
  MonthPicker,
  YearPicker
} from "./components/Calendar";
import { Container, Row, Col } from "./components/Grid";
import ShiftTypeIndicator from "./components/ShiftTypeIndicator";

import "./App.css";

class App extends Component {
  static SHIFT_STORAGE_KEY = "SHIFT_STORAGE_KEY";
  static LOCKED_STORAGE_KEY = "LOCKED_STORAGE_KEY";

  state = {
    locked: true,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    shifts: {},
    shiftTypes: {
      byId: {
        1: {
          displayName: "Day shift",
          reference: "day_shift",
          color: "#7D8C8D"
        },
        2: {
          displayName: "Night shift",
          reference: "night_shift",
          color: "#E8BE3D"
        },
        3: {
          displayName: "Holiday",
          reference: "holiday",
          color: "#4CAF50"
        },
        4: {
          displayName: "Study day",
          reference: "study_day",
          color: "#2196F3"
        }
      },
      allIds: [1, 2, 3, 4]
    }
  };

  componentDidMount() {
    const locked = localStorage.getItem(App.LOCKED_STORAGE_KEY);
    const shifts = localStorage.getItem(App.SHIFT_STORAGE_KEY);

    if (locked !== null && locked !== undefined) {
      this.setState({ locked: JSON.parse(locked) });
    }

    if (shifts) {
      this.setState({ shifts: JSON.parse(shifts) });
    }
  }

  handleLockedStatusChanged = () => {
    this.setState({ locked: !this.state.locked }, () => {
      localStorage.setItem(App.LOCKED_STORAGE_KEY, this.state.locked);
    });
  };

  handleDayClicked = date => {
    const key = date.getTime();
    const shiftTypes = this.state.shiftTypes;
    const shift = this.state.shifts[key];

    if (!shift) {
      this.addShift(key, { type: this.state.shiftTypes.allIds[0] });
      return;
    }

    this.addShift(key, {
      ...this.state.shifts[key],
      type: shift.type >= shiftTypes.allIds.length ? 0 : ++shift.type
    });
  };

  addShift = (key, shift) => {
    this.setState(
      {
        shifts: {
          ...this.state.shifts,
          [key]: { ...shift }
        }
      },
      () => {
        localStorage.setItem(
          App.SHIFT_STORAGE_KEY,
          JSON.stringify(this.state.shifts)
        );
      }
    );
  };

  render() {
    const { locked, shifts, shiftTypes, month, year, dayHeaders } = this.state;

    return (
      <main className="app">
        <AppHeader
          locked={locked}
          onToggleLocked={this.handleLockedStatusChanged}
        />
        <Container className="calendar app-container">
          <Row className="mb-2">
            {shiftTypes.allIds
              .map(id => ({ id, ...shiftTypes.byId[id] }))
              .map(shiftType => (
                <Col key={shiftType.id} span={6} className="mb-2">
                  <ShiftTypeIndicator
                    displayName={shiftType.displayName}
                    color={shiftType.color}
                  />
                </Col>
              ))}

            <Col span={6} />
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
            {dayHeaders.map(day => <Col key={day}>{day}</Col>)}
          </Row>

          <Row>
            <Col className="pl-1 pr-1">
              <Overview
                month={month}
                year={year}
                renderDay={({ date }) => {
                  const shift = date ? shifts[date.getTime()] : null;
                  const shiftType = shift ? shiftTypes.byId[shift.type] : null;

                  return (
                    <CalendarDay
                      date={date}
                      backgroundColor={shiftType && shiftType.color}
                      onClick={() => !locked && this.handleDayClicked(date)}
                    />
                  );
                }}
              />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default App;
