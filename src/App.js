import React, { Component } from "react";

import AppHeader from "./components/AppHeader";
import { Overview, CalendarDay } from "./components/Calendar";
import { Container, Row, Col } from "./components/Grid";

import "./App.css";

class App extends Component {
  state = {
    locked: true,
    today: new Date(),
    dayHeaders: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dates: {},
    availableColours: [
      "#37474F",
      "#F44336",
      "#009688",
      "#4CAF50",
      "#00BCD4",
      "#FF9800"
    ]
  };

  handleDayClicked = date => {
    const key = date.getTime();

    if (!this.state.dates[key]) {
      this.setState({
        dates: {
          ...this.state.dates,
          [key]: {
            colourIndex: 1
          }
        }
      });

      return;
    }

    const currentColourIndex = this.state.dates[key].colourIndex;

    this.setState({
      dates: {
        ...this.state.dates,
        [key]: {
          ...this.state.dates[key],
          colourIndex: currentColourIndex === 5 ? 0 : currentColourIndex + 1
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
            {this.state.dayHeaders.map(day => <Col key={day}>{day}</Col>)}
          </Row>

          <Row>
            <Col>
              <Overview
                month={this.state.today.getMonth() + 1}
                year={this.state.today.getFullYear()}
                renderDay={({ date }) => {
                  const dateSettings = date
                    ? this.state.dates[date.getTime()]
                    : null;
                  const backgroundColour = dateSettings
                    ? this.state.availableColours[dateSettings.colourIndex]
                    : this.state.availableColours[0];

                  return (
                    <CalendarDay
                      date={date}
                      backgroundColor={backgroundColour}
                      onClick={() => this.handleDayClicked(date)}
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
