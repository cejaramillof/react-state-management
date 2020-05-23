import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
    };
    this.increment = this.increment.bind(this);
  }

  increment() {
    console.log(this.state.count); // print 3, because setState() is Asynchronous
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // print 3, because setState() is Asynchronous
    this.setState({ count: this.state.count + 3 }); // Like in object merge, there's duplicate keys, the last one wins
    console.log(this.state.count); // print 3, because setState() is Asynchronous // Queuing upstate changes

    /*
     when this function finish, count will be 6, because react:
      1. will batch them up,
      2. figure out the result
      3. efficiently make that change.
    */
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  reset() {
    this.setState({ count: 0 });
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;