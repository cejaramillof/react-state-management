import React, { useReducer, useCallback } from 'react';

import GrudgesC from './GrudgesC';
import NewGrudgeC from './NewGrudgeC';

const UseContext = () => {
  return (
    <div className="Application">
      <NewGrudgeC />
      <GrudgesC />
    </div>
  );
};

export default UseContext;
