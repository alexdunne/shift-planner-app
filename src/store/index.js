import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "../reducer";

export const configureStore = preloadedState => {
  const persistedReducer = persistReducer(
    {
      key: "root",
      storage
    },
    rootReducer
  );

  const middlewares = [];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  const store = createStore(persistedReducer, preloadedState, applyMiddleware(...middlewares));
  const persistor = persistStore(store);

  return { store, persistor };
};
