import React from 'react';

import FetchTweets from './FetchTweets';
import Tweets from './Tweets';

import './styles.scss';

const Application = () => {
  return (
    <div className="Application">
      <h1>Tweet Stream</h1>
      <FetchTweets />
      <Tweets />
    </div>
  );
};

export default Application;