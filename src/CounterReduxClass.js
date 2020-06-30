import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';


const initialState = {
  count: 0,
}

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// action creator
const increment = () => ({
  type: INCREMENT,
});

const decrement = () => ({
  type: DECREMENT,
});

const reducer = (state = initialState, action) => {
  if (action.type == INCREMENT) {
    return {
      count: state.count + 1,
    };
  }

  if (action.type == DECREMENT) {
    return {
      count: state.count - 1,
    };
  }
  return state;
}

export const store = createStore(reducer);

class CounterReduxClass extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    console.log({ count, increment, decrement })
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button>Reset</button>
        </section>
      </main >
    );
  }
}

// will get all redux state (frm all app) but you dont need all, because in each change whatever will rerender
const mapStateToProps = (state, ownProps) => {
  return state
  /*
  {
    prop: state.prop
  }
  */
}

// in new versions of redux works this, and is better da performance if you dont need send data
const mapDispatchToProps = {
  increment,
  decrement
}

/*
const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    increment,
    decrement
  }, dispatch)

  return {
    increment() { dispatch(increment()) },
    decrement: () => {
      dispatch(decrement())
    }
  }
}
*/

const CounterContainer = connect(
  mapStateToProps, // can be null, for only pass dispatch
  mapDispatchToProps
)(CounterReduxClass);

export default CounterContainer;
// export default CounterReduxClass;