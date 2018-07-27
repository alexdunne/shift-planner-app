import React, { Component } from "react";

import AppHeader from "./components/AppHeader";

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
      </main>
    );
  }
}

export default App;
