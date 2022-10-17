import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';

const store =
    process.env.NODE_ENV === 'development'
        ? createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
        : createStore(rootReducer);

export default store;
