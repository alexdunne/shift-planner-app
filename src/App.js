import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import OverviewScreen from "screens/OverviewScreen";
import { configureStore } from "store";

import "./index.css";
import "./flex.css";
import "./spacing.css";

const shiftTypes = {
  byId: {
    "0d4bdc27-fcb0-469d-b398-af68d6da02fa": {
      displayName: "Day shift",
      reference: "day_shift",
      color: "#687878"
    },
    "19b6879d-40a8-40dc-9cb4-a35f6f2959a8": {
      displayName: "Night shift",
      reference: "night_shift",
      color: "#DD435B"
    },
    "99dead20-a9e1-4c2b-be3d-763e6e5395c8": {
      displayName: "Holiday",
      reference: "holiday",
      color: "#2196F3"
    },
    "60789850-c73f-4f70-ac37-3aece381e96f": {
      displayName: "Study day",
      reference: "study_day",
      color: "#FF9800"
    }
  },
  allIds: [
    "0d4bdc27-fcb0-469d-b398-af68d6da02fa",
    "19b6879d-40a8-40dc-9cb4-a35f6f2959a8",
    "99dead20-a9e1-4c2b-be3d-763e6e5395c8",
    "60789850-c73f-4f70-ac37-3aece381e96f"
  ]
};

const { store, persistor } = configureStore({ shiftTypes });

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Route exact path="/" component={OverviewScreen} />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
