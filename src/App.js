import React from 'react';
import CounterClass from './CounterClass';
import CounterFunction from './CounterFunction';
import UseReducer from './useReducer/UseReducer';
import UseState from './useReducer/UseState';
import UseContext from './useReducer/UseContext';
import { GrudgeProvider } from './useReducer/GrudgeContext';
import SWApplication from './star-wars/SWApplication';
import SWApplicationThunk from './star-wars/SWApplicationThunk';
import SWApplicationReducer from './star-wars/SWApplicationReducer';
import UserSignup from './UserSignUp';
import CounterReduxClass, { store } from './CounterReduxClass';
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <CounterReduxClass />
      </Provider>
      <hr />
      <UserSignup />
      <hr />
      <SWApplicationThunk />
      <hr />
      <SWApplicationReducer />
      <hr />
      <SWApplication />
      <hr />
      { /*
      <CounterFunction step={3} />
      <hr />
      <CounterClass step={3} />
      */}
      <hr /> UseState
      <UseState />
      <hr /> UseReducer
      <UseReducer />
      <hr /> UseContext
      <GrudgeProvider>
        <UseContext />
      </GrudgeProvider>
    </>
  );
}

export default App;
