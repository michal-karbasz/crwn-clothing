import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const middlewares = [thunk];
const isDevelopment = process.env.NODE_ENV === 'development';

isDevelopment && middlewares.push(logger);
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };
