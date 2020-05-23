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