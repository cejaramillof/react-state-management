import React, { useState, useEffect, useRef } from 'react';

const dec = (count) => {
  // here dont have access to props
  return count - 1
}

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterFState');
  if (storage) return JSON.parse(storage).count;
  return 0;
}

const storageInLocalStorage = (count) => {
  localStorage.setItem('counterFState', JSON.stringify({ count }))
  console.log('after! ', count)
  document.title = `${count}`;
}

const useLocalStorage = (initialValue, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    console.log(storage);
    if (storage) return JSON.parse(storage).value;
    return initialValue;
  }

  const [value, setValue] = useState(get());

  useEffect(() => {
    setTimeout(() => {
      console.log(`Count TO: ${value}`) // this is not reference, like in a class component
    }, 3000);
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value, key]);

  return [value, setValue];
};


const CounterFunction = ({ step }) => {
  // const [count, setCount] = useState(getStateFromLocalStorage());
  const [count, setCount] = useLocalStorage(0, 'counterFHState');
  const countRef = useRef(); // {current: null}, can have primitives by value, objects by reference

  let message = '';
  console.log(countRef);
  console.log(count);
  if (countRef.current < count) message = 'Higher'
  if (countRef.current > count) message = 'Lower';
  console.log(message);

  countRef.current = count;

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
    // dont have callback, like a this.state, but can use useEffect
  }
  const reset = () => setCount(0);

  useEffect(() => {
    storageInLocalStorage(count)
  }, [count])

  useEffect(() => {
    document.title = `${count}`
  }, [count]) // when you use empty array and send different props to the same component, this dont be mounted again

  return (
    <div className="Counter">
      <p className="count">CounterFunction: {count}</p>
      <section className="controls">
        {message}
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
}

export default CounterFunction;