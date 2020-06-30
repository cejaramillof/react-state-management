import React from 'react';
import { fetchTweets } from './actions';
import { connect } from 'react-redux';

const FetchTweets = ({ fetchTweets }) => {
  return <button onClick={fetchTweets}>Fetch Tweets</button>;
};

// export default FetchTweets;
export default connect(
  null,
  {fetchTweets}
)(FetchTweets);