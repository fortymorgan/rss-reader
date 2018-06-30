import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import App from './components/App.jsx';
import { getFeedsList } from './storage';
import * as actions from './actions';

export default () => {
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );

  const feedsFromStorage = getFeedsList();
  store.dispatch(actions.downloadOnStart(feedsFromStorage));

  const mountNode = document.getElementById('container');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountNode,
  );

  setTimeout(() => store.dispatch(actions.updateFeeds(store)), 5000);
};
