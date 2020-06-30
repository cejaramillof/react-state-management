# Pure functions
Take arguments and return values based on those arguments.

```javascript
const add = (a, b) => {
  return a + b ;
}
```

# Impure functions
an mutate things from outside their scope or produce side effects.

```javascript
const b;
const add = (a) => {
  return a + b ;
}

const add = (a, b) => {
  console.log('impure');
  return a + b ;
}

const add = (a, b) => {
  Api.post('/add', { a,b }, (response) => {
    // Do something.
  });
  return a + b ;
}

// Mutate arrays and objects is also impure.

// all data structures in js are mutables, except strings,
// cuz usually use immutable.js, mori, etc.
```
# Copy object
```javascript
const original = { a: 1, b:2 };
const extension = { c: 3 };
const copy = Object.assign({}, original); // will merge both objects
const copyMultiple = Object.assign({}, original, extension); // will merge both objects
// when your use empty object in first prop, will get effectively copy

// with babel or modern browsers
const original = { a: 1, b:2 };
const extension = { c: 3 };
const copy = {...original};
const copyMultiple = {...original, ...extension};


// copy array
const original = [1, 2, 3];
const copy = original.slice(); // get back a new array

// copy array
const original = [1, 2, 3];
const copy = [ ...original ] // get back a new array


// array.push will add stuff an arrat but it mutates the array.
// array.push is 945 times faster than array.concat but tough, we need immutable data structures.

// extend array
const original = [1, 2, 3];
const extended = original.concat(4);
const moreExtended = original.concat([4,5]);

// extend array
const original = [1, 2, 3];
const extended = [ ...original, 3 ,4 ];
const moreExtended = [ ...original, ...extended ];
```


# Redux
The whole state tree of your application is kept in one store.

- just one plain old javascript object.
- One doest not simply modify the state tree ( need dispatch an action ) ( action is only a string or a number )
- - action creators are optionals (action creators are functions)
- Reducer function is a pure function it takes (AllCurrentState and action) and return new state.

## Functions
- applyMiddleware - In between that action and it hitting the reducer
```javascript
import { applyMiddleware } from 'redux';

const logger = ({ getState }) => {
  return next => action => {
    console.log('MIDDLEWARE', getState(), action);
    const value = next(action); // because you can chain multiple middleware together
    return value;
  }
};

const secondStore = createStore(reducer, applyMiddleware(logger));
```

- bindActionCreator - bindActionCreators (in react redux)
```javascript
import { bindActionCreator } from 'redux';
import { bindActionCreators } from 'react-redux';

const addAction = {
  type: 'ADD',
  payloud: {
    amount: 4
  }
};

const createAddAction = (amount) => {
  return {
    type: 'ADD',
    payloud: {
      // amount: amount
      amount
    }
  }
}
createAddAction(4);

const handrolledDispatch = store.dispatch(createAddAction(4));
const dispatchAdd = bindActionCreator(createAddAction, store.dispatch);

// bindActionCreators from react-redux, takes a bunch of these actions, like an object of them and binds them all with the same dispatch.
// you could write your own.
const bindActionCreators = (actions, dispatch) => {
  return Object.keys(actions).reduce((boundActions, key) => {
    boundActions[key] = bindActionCreator(actions[key], dispatch)
  }, {}); // the second array is for start with empty object
}
```

- combineReducers: function() = Just lets you take a big object in your state and combine it all together
```javascript
import { combineReducers } from 'redux';

const calculatorReducer = (state, action) => {
  return state;
};
const errorMessageReducer = (state, action) => {
  return state;
};

const reducer = combineReducers({
  calculator: calculatorReducer,
  error: errorMessageReducer
});

console.log(reducer); // function combination()
// Does i'ts like compose, they return completely separate.
// multiples functions with different parts of this state object
```

- compose: function() = Very simila to flow or pipe from lowdash
```javascript
import { compose } from 'redux';

const makeLouder = (string) => string.toUpperCase();
const repeatThreeTimes = (string) => string.repeat(3);
const embolden = (string) => string.bold();

const makeLouderAndBoldAndRepeatThreeTimes = compose(embolden, repeatThreeTimes, makeLouder);

makeLouderAndBoldAndRepeatThreeTimes('xd'); // "<b>XDXDXD</b>"
```

- createStore: function() = a store is effectively our ability to manage state of our application, the current state the all, and the ability to dispatch actions to change that state
```javascript
import { createStore } from 'redux';

createStore(); // Error, expected the reducer to be a function
createStore(() => {}); // works

// reducer is a function then get current state of app, an action and return a new state
const reducer = (state, action) => {
  return state;
};

const store = createStore(reducer);
console.log(store);
console.log(Object.keys(store)); // ['dispatch', 'subscribe', 'getState', replaceReducer']
// dispatch used to dispatch actions to change the state
// subscribe fires an event every time the state of the world changes // used in SSR to update UI but react-redux can handle this for you
// getState wanna go return current state of the world
// replaceReducer you give it a new function, it replaces the reducer // code splitting

const reducer = (state = {value: 1}, action) => {
  return state;
};

const store = createStore(reducer);
console.log(store.getState()); // [object Object] { value: 1}

```


# You might not need Redux
```javascript
class NewItem extends Component {
  state = {value: ''};
  handleChange = event => {
    const value = event.target.value;
    this.setState({value});
  }
  handleSubmit = event  => {
    const { onSubmit } = this.props;
    const { value } = this.state;

    event.preventDefault();

    onSubmit({value, packed: false, id: uniqueId()});
    this.setState({value: ''});
  };
  render() {...}
}
```

### If you want add redux:
- NewItem.js
- NewItemContainer.js
- newitem-actions-js
- items-reducer.js


# Observable
And observable you can think about as a stream. Think about an array over the dimension of time

## What is an observable?
- A stream of zero, one, or more values.
- The stream come in over a series of time.
- The stream is cancelable.

## Redux Observable
- Is a combination of RxJS and Redux
- Side effect managment using "epics".

## Epic
A function that takes a stream of all actions dispatched, and returns a new stream of actions to dispatch.

## Flow
- Redux Action -> Epic (Side effects, async, and other fun) -> Redux Action -> Reducer
- Redux Action -> Reducer

## Redux Observable Example

```javascript
// This is not an epic
const pingPong = (action, store) => {
  if (acion.type === 'PING') {
    return {
      type: 'PONG'
    };
  }
}

// this is what it looks like in an epic.
const pingPongEpic = (action$, store) =>
  action$.ofType('PING')
    .map(action => ({ type: 'PONG' }));
```

# State Management
The main job of react is to take your application state and turn it into DOM nodes.

## There are many Kinds of State:
- **Model Data:** the nouns in your application.
- **View/UI State:** Are those nouns sorted in ascending or descending order?
- **Session State:** Is the user even logged in?
- **Communication:** Are we in the process of fetching the nouns from the server?
- **Location:** Where are we in the application? Which nouns are we looking at?

## or, it might make sense to think about state relative to time
- **Model State:** This is likely the data in your application. This could be the items in a given list.
- **Ephemeral state:** Stuff like the value of an input field that will be wiped away when you hit "enter". This could be the order in which a given list is sorted.

# There is no silver bullet

## Patterns and anti-patterns
- When we're working with props, we have proptypes. That's not the case with state
- Don't duplicate data from props in state
- Calculate what you can in render() method
- Don't keep something in state if you dont use it for rendering.
- - Like API Subscriptionn, are better of as custom private fields or variables in external modules
- Don't use this.state for derivations of props (new values calculateds from props)
- - Because if youre calculating on constructor, and reusing in other page, they dont will be re-calculated
- - Don't do this. instead, derive computed properties directly from the props themselves. Because in each change of props, will be re-rendered
- You don't need to shove everything into your render method.
- - Can segmentate creating functions with small parts
- - Use sensible


- `this.state` class propertie
- `useState()` is a method


# Thunks
Thunks is a function returned by another function.
The major idea behind a thunk is that it its code to be executed later.

```javascript
function definitelyNotAThunk() {
  return function aThunk() {
    console.log('Hello, Im a Thunk.');
  }
}
```

## Redux Thunks
Is a middleware that allows us to dispatch a function (thunk) now that will dispatch a legit action later.


[hooks] (https://nikgraf.github.io/react-hooks/)
----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
