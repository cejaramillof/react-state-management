import React from 'react';
import CounterClass from './CounterClass';
import CounterFunction from './CounterFunction';
import Application from './useReducer/Application';

function App() {
  return (
    <>
      <CounterFunction step={3} />
      <hr />
      <CounterClass step={3} />
      <hr />
      <Application />
    </>
  );
}

export default App;
