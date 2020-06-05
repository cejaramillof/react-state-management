import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  // remove strict mode, because they make twice renders on develop mode
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
