import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// import Application from './kanbananza/components/Application';
// import Application from './tweet-stream/';
import Application from './auto-complete/';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './kanbananza/reducers'
import reducer from './tweet-stream/reducer';
import thunk from 'redux-thunk';
import autoCompleteRootReducer from './auto-complete/reducer';
import rootEpic from './auto-complete/fetch-character-epic.js';
import { createEpicMiddleware } from 'redux-observable';
/*
ReactDOM.render(
  // remove strict mode, because they make twice renders on develop mode
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
*/

/*
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
  // remove strict mode, because they make twice renders on develop mode
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
*/

/*
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
*/

const epicMiddleware = createEpicMiddleware();
const store = createStore(autoCompleteRootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);