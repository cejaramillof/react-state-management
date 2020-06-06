import React, { useReducer, useCallback, useContext } from 'react';

import GrudgesC from './GrudgesC';
import NewGrudgeC from './NewGrudgeC';
import { GrudgeContext } from './GrudgeContext';

const UseContext = () => {
  const { undo, isPast, redo, isFuture } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <button disabled={!isPast} onClick={undo}>
        Undo
      </button>
      <button disabled={!isFuture} onClick={redo}>
        Redo
      </button>
      <NewGrudgeC />
      <GrudgesC />
    </div>
  );
};

export default UseContext;
