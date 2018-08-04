import React, { Component } from "react";

import AppHeader from "./components/AppHeader";
import { Overview, CalendarDay } from "./components/Calendar";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {
  state = {
    date: new Date(),
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    locked: true
  };

  render() {
    return (
      <main>
        <AppHeader
          locked={this.state.locked}
          onToggleLocked={() => this.setState({ locked: !this.state.locked })}
        />
        <Container className="mt-4 text-center" fluid={false}>
          <Row className="mb-3">
            {this.state.days.map(day => <Col key={day}>{day}</Col>)}
          </Row>

          <Row>
            <Col>
              <Overview
                month={this.state.date.getMonth() + 1}
                year={this.state.date.getFullYear()}
                renderDay={({ date }) => <CalendarDay date={date} />}
              />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default App;
