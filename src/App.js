import React, { Component } from "react";

import AppHeader from "./components/AppHeader";
import { Overview, CalendarDay } from "./components/Calendar";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {
  state = {
    locked: true
  };

  render() {
    return (
      <main>
        <AppHeader
          locked={this.state.locked}
          onToggleLocked={() => this.setState({ locked: !this.state.locked })}
        />
        <Container fluid={false}>
          <Row>
            <Col>
              <Overview
                month={7}
                year={2018}
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
