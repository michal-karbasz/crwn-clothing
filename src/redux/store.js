import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './rootReducer';

const middlewares = [logger];
const isDevelopment = process.env.NODE_ENV === 'development';
const store = createStore(
  rootReducer,
  isDevelopment && applyMiddleware(...middlewares)
);
const persistor = persistStore(store);

export { store, persistor };
