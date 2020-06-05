import React, { useState, useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const functions = new Set();

const UseState = () => {
  const [grudges, setGrudges] = useState(initialState);

  const addGrudge = useCallback(grudge => {
    grudge.id = uuid();
    grudge.forgiven = false;
    // can't use useCallback, because grudges are changing in each add
    setGrudges(grudges => [grudge, ...grudges])

    // setGrudges([grudge, ...grudges]);
    // with this can't use useCallback, because grudges are changing in each add
  }, [setGrudges]);


  const addGrudgeC = useCallback(grudgesx => {
    return (grudge) => {
      grudge.id = uuid();
      grudge.forgiven = false;
      setGrudges([grudge, ...grudgesx])
    }
  }, [setGrudges]);
  functions.add(addGrudgeC)
  console.log(functions)

  /*
  const xd = addGrudgeC(grudges);
  functions.add(xd)
  console.log(functions)
  */

  const toggleForgiveness = useCallback((id) => {
    setGrudges(grudges =>
      grudges.map(grudge => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );
    /*
    this dont works, because grudges in each iteraction will be the first initial state
    setGrudges(
      grudges.map(grudge => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );
    */
  }, [setGrudges]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default UseState;
