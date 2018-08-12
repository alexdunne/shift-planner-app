import get from "lodash/get";

const storage = store => next => action => {
  if (
    !action.meta ||
    !action.meta.storage ||
    !action.meta.storage.localStorageKey ||
    !action.meta.storage.localStorageDataPath
  ) {
    return next(action);
  }

  const { localStorageKey, localStorageDataPath } = action.meta.storage;

  const result = next(action);

  localStorage.setItem(
    localStorageKey,
    JSON.stringify(get(store.getState(), localStorageDataPath))
  );

  return result;
};

export default storage;
