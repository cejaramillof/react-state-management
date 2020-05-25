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
