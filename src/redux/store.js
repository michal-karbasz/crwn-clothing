import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// can take additional options
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const isDevelopment = process.env.NODE_ENV === 'development';

isDevelopment && middlewares.push(logger);
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
