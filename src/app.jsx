import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import reducers from './reducers';
import App from './components/App.jsx';
import { getFeedsList } from './storage';
import * as actions from './actions';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
  );

  const feedsFromStorage = getFeedsList();
  const lastId = Object.keys(feedsFromStorage).sort((a, b) => b - a)[0];
  if (lastId) {
    store.dispatch(actions.updateNextId(+lastId));
  }
  store.dispatch(actions.downloadOnStart(feedsFromStorage));

  library.add(faChevronDown);
  library.add(faChevronUp);

  const mountNode = document.getElementById('container');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountNode,
  );

  setTimeout(() => store.dispatch(actions.updateFeeds(store)), 5000);
};
