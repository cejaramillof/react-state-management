import React, { useState, useReducer, useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [
      action.payload,
      ...state,
    ]
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    })
  }
  return state;
};

const Application = () => {
  // const [grudges, setGrudges] = useState(initialState);
  const [grudges, dispatch] = useReducer(reducer, initialState);

  /*
  const addGrudge = grudge => {
    grudge.id = uuid();
    grudge.forgiven = false;
    setGrudges([grudge, ...grudges]);

    // can't use useCallback, because grudges are changing in each add
  };
  */

  const addGrudge = useCallback(({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: uuid(),
      }
      // meta: {},
      // error: true,
    });
  }, [dispatch]);

  const toggleForgiveness = useCallback((id) => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: { id },
    })
    /*
    setGrudges(
      grudges.map(grudge => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );
    */
  }, [dispatch]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
