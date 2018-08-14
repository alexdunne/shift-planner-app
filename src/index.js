import React from "react";
import ReactDOM from "react-dom";

import App from "App";
import registerServiceWorker from "registerServiceWorker";

import "./index.css";
import "./flex.css";
import "./spacing.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
