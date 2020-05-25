import React from 'react';
import CounterClass from './CounterClass';
import CounterFunction from './CounterFunction';

function App() {
  return (
    <>
      <CounterFunction step={3} />
      <hr />
      <CounterClass step={3} />
    </>
  );
}

export default App;
