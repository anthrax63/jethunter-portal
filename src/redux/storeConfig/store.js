import {createStore, applyMiddleware, compose} from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import createHelpers from './createHelpers';

const middlewares = [thunk.withExtraArgument(createHelpers()), createDebounce()];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export {store};
