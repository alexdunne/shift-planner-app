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
  state = {
    locked: true,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dates: {},
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

  handleDayClicked = date => {
    const key = date.getTime();
    const shiftTypes = this.state.shiftTypes;
    const shift = this.state.dates[key];

    if (!shift) {
      this.setState({
        dates: {
          ...this.state.dates,
          [key]: {
            shiftType: 1
          }
        }
      });

      return;
    }

    this.setState({
      dates: {
        ...this.state.dates,
        [key]: {
          ...this.state.dates[key],
          shiftType:
            shift.shiftType >= shiftTypes.allIds.length ? 0 : ++shift.shiftType
        }
      }
    });
  };

  render() {
    return (
      <main className="app">
        <AppHeader
          locked={this.state.locked}
          onToggleLocked={() => this.setState({ locked: !this.state.locked })}
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
                  const dateSettings = date
                    ? this.state.dates[date.getTime()]
                    : null;
                  const shiftType = dateSettings
                    ? this.state.shiftTypes.byId[dateSettings.shiftType]
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
