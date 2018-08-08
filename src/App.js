import React, { Component } from "react";

import AppHeader from "./components/AppHeader";
import {
  Overview,
  CalendarDay,
  MonthPicker,
  YearPicker
} from "./components/Calendar";
import { Container, Row, Col } from "./components/Grid";

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
          backgroundColor: "#F44336"
        },
        2: {
          displayName: "Night shift",
          reference: "night_shift",
          backgroundColor: "#009688"
        },
        3: {
          displayName: "Holiday",
          reference: "holiday",
          backgroundColor: "#4CAF50"
        },
        4: {
          displayName: "Study day",
          reference: "study_day",
          backgroundColor: "#00BCD4"
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
    return (
      <main className="app">
        <AppHeader
          locked={this.state.locked}
          onToggleLocked={this.handleLockedStatusChanged}
        />
        <Container className="calendar" fluid={false}>
          <Row className="mb-3">
            <Col span={6}>
              <MonthPicker
                onChange={({ value }) => {
                  this.setState({ month: value });
                }}
                value={this.state.month}
              />
            </Col>

            <Col span={6}>
              <YearPicker
                onChange={({ value }) => {
                  this.setState({ year: value });
                }}
                value={this.state.year}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            {this.state.dayHeaders.map(day => <Col key={day}>{day}</Col>)}
          </Row>

          <Row>
            <Col>
              <Overview
                month={this.state.month}
                year={this.state.year}
                renderDay={({ date }) => {
                  const shift = date ? this.state.shifts[date.getTime()] : null;
                  const shiftType = shift
                    ? this.state.shiftTypes.byId[shift.type]
                    : null;

                  return (
                    <CalendarDay
                      date={date}
                      backgroundColor={shiftType && shiftType.backgroundColor}
                      onClick={() =>
                        !this.state.locked && this.handleDayClicked(date)
                      }
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
