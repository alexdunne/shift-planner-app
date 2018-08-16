import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";

import App from "App";
import registerServiceWorker from "registerServiceWorker";

import "./index.css";
import "./flex.css";
import "./spacing.css";

ReactModal.setAppElement("#modal-root");

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
