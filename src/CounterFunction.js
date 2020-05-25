import React, { Component, useState } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

function storageInLocalStorage() {
  localStorage.setItem('counterState', JSON.stringify(this.state))
  console.log('after! ', this.state.count)
  document.title = `Count: ${this.state.count}`;
}

const decrement = (state, props) => {
  const { count } = state;
  const { step } = props;
  return { count: count - step }
};

const dec = (count) => {
  // here dont have access to props
  return count - 1
}

const CounterFunction = ({ step }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1); // works like a propertie state (class), is async, and only add + 1
    console.log('before', count); // will print 0 because is async
  }
  const decrement = () => {
    setCount(count => count - 1) // works like a propertie state (class), but the difference is this dont get second argument (props)
    setCount(count => count - 1)
    setCount(dec)
    setCount(count => {
      if (count >= 0) return count; // need return a value, because here will merge all objects
      return count - step
    })
  }
  const reset = () => setCount(0);

  return (
    <div className="Counter">
      <p className="count">CounterFunction: {count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default CounterFunction;