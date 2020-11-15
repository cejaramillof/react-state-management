import React, { lazy, Suspense } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import CounterClass from './CounterClass';
import CounterFunction from './CounterFunction';
import UseReducer from './useReducer/UseReducer';
import UseState from './useReducer/UseState';
import UseContext from './useReducerContext/UseContext';
import { GrudgeProvider } from './useReducerContext/GrudgeContext';
import SWApplicationThunk from './star-wars/SWApplicationThunk';
import SWApplicationReducer from './star-wars/SWApplicationReducer';
import CounterReduxClass, { store as CounterStore } from './CounterReduxClass';
import tweetStreamReducer from './tweet-stream/reducer';
import autoCompleteRootReducer from './auto-complete/reducer';
import rootEpic from './auto-complete/fetch-character-epic.js';
import kanbananzaRootReducer from './kanbananza/reducers';

const SWApplication = lazy(() => import('./star-wars/SWApplication'));
const UserSignup = lazy(() => import('./UserSignUp'));
const TweetStream = lazy(() => import('./tweet-stream/'));
const AutoCompleteApp = lazy(() => import('./auto-complete'));
const KanbananzaApplication = lazy(() => import('./kanbananza/components/Application'));

const routes = [
  { route: 'counter-class', name: 'counter class' },
  { route: 'counter-function', name: 'counter function' },
  { route: 'counter-redux', name: 'counter redux' },
  { route: 'usestate', name: 'usestate' },
  { route: 'usereducer', name: 'usereducer' },
  { route: 'grudge-usecontext', name: 'grudge usecontext' },
  { route: 'user-signup', name: 'user signup' },
  { route: 'swapp', name: 'swapp' },
  { route: 'swapp-thunk', name: 'swapp thunk' },
  { route: 'swapp-reducer', name: 'swapp reducer' },

  { route: 'tweet-stream', name: 'tweet stream' },
  { route: 'auto-complete', name: 'auto complete starwars' },
  { route: 'kanbananza-board', name: 'kanbananza board' },
]

const menuStyle = {
  background: 'white',
  position: 'fixed',
  textAlign: 'right',
  right: '10px',
  bottom: '10px',
  margin: 0,
  listStyle: 'none',
}
function App() {
  return (
    <>
      <ul style={menuStyle}>
        {
          routes.map(({ route, name }) => (
            <li key={route}>
              <NavLink activeStyle={{ color: 'red' }} to={`/${route}`}>
                {name}
              </NavLink>
            </li>
          ))
        }
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/counter-class" component={() => (
            <CounterClass step={3} />
          )} />
          <Route exact path="/counter-function" component={() => (
            <CounterFunction step={3} />
          )} />
          <Route exact path="/usereducer" component={UseReducer} />
          <Route exact path="/usestate" component={UseState} />
          <Route exact path="/user-signup" component={UserSignup} />
          <Route exact path="/swapp" component={SWApplication} />
          <Route exact path="/swapp-thunk" component={SWApplicationThunk} />
          <Route exact path="/swapp-reducer" component={SWApplicationReducer} />
          <Route exact path="/counter-redux" component={() => (
            <Provider store={CounterStore}>
              <CounterReduxClass />
            </Provider>
          )} />
          <Route exact path="/grudge-usecontext" component={() => (
            <GrudgeProvider>
              <UseContext />
            </GrudgeProvider>
          )} />
          <Route exact path="/tweet-stream" component={() => {
            const store = createStore(tweetStreamReducer, applyMiddleware(thunk));
            return (
              <Provider store={store}>
                <TweetStream />
              </Provider>
            )
          }} />
          <Route exact path="/auto-complete" component={() => {
            const epicMiddleware = createEpicMiddleware();
            const store = createStore(autoCompleteRootReducer, applyMiddleware(epicMiddleware));
            epicMiddleware.run(rootEpic);
            return (
              <Provider store={store}>
                <AutoCompleteApp />
              </Provider>
            )
          }} />
          <Route exact path="/kanbananza-board" component={() => {
            const store = createStore(
              kanbananzaRootReducer,
              window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )
            return (
              <Provider store={store}>
                <KanbananzaApplication />
              </Provider>
            )
          }} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
