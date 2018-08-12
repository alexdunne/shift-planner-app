import { applyMiddleware, createStore } from "redux";

import storage from "./storage";
import rootReducer from "../reducer";

export const configureStore = preloadedState => {
  const middlewares = [storage];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

  return store;
};
