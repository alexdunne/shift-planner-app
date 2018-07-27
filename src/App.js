import React, { Component } from "react";

import AppHeader from "./components/AppHeader";
import Planner from "./components/Planner";

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
        <Planner />
      </main>
    );
  }
}

export default App;
