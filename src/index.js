import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  // remove strict mode, because they make twice renders on develop mode
  <App />,
  document.getElementById('root')
);
