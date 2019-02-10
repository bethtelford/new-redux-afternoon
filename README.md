<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we'll create an application to create and view recipe cards using React and Redux.

# Live Example

<a href="https://devmountain.github.io/react-5-mini/">[FIX ME WHEN HOSTED] Click Me!</a>

## Setup

- `fork` and `clone` this repository.
- `cd` into the project root.
- Run `npm install` to fetch the project dependencies.
- Run `npm start` to spin up a development server.

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/1.png" />

## Step 1

### Summary

In this step, we'll install some new dependencies, create a reducer, and create a Redux store.

### Instructions

- Install `redux`.
- Open `/src/store.js`.
- Import `createStore` from Redux.
- Create an empty initial state object.
- Write a simple reducer. It should just return state by default.
- Create and export a Redux store.

<details>
<summary>Detailed Instructions</summary>

In Redux, components need to connect to a store. Let's create this store. Open `store.js`. We'll only be needing one thing from `redux`: `createStore`. `createStore` does exactly what the name would imply.

```js
import { createStore } from "redux";
```

In order to create our store, we'll also need to create our state and reducer. Let's start with state. Our state will be empty for now.

```js
const initialState = {};
```

Now that our initial state is set up, let's build a basic reducer. The reducer is a function that takes in two things: state and an action. Let's use our `initialState` as the default value for state.

```js
function reducer(state = initialState, action) {}
```

Next we should build the switch statement inside the reducer. The switch should test the `type` property of the `action` object. It should return state unaltered as the default. Let's also destructure the action object for easy access to its properties.

```js
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
```

Now that we have all the pieces we need, let's create and export our store. We'll want to make this export the default

```js
export default createStore(reducer);
```

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

## Step 2

### Summary

In this step, we'll expand our `reducer` so we can update the name and the category of our recipe.

### Instructions

- Add two properties to `initialState` in `store.js`
  - One to store the recipe name.
  - One to store the recipe category.
- Create two constants.
  - One for for updating the recipe name.
  - One for updating the recipe category.
  - Remember to export them.
- Add two cases to the `switch`.
  - These should match the constants just created.
  - These should alter the appropriate part of the state object and return the new state.

<details>
<summary>Detailed Instructions</summary>

Every time we want to store something in Redux state, we need to add it to the `initialState` object with a default value. For our first set of inputs an empty string will work great.

```js
const initialState = {
  name: "",
  category: ""
};
```

Now we need to create some action types. These should describe what the action will do. We need to export these so we can access them in all our components as well.

```js
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
```

Next we need to tell the `reducer` what to do with these actions when it recieves them. Let's add some cases to our `switch`. The cases should match the action types we just made.

```js
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:

    case UPDATE_CATEGORY:

    default:
      return state;
  }
}
```

Each case should update the piece of state that it needs to, and copy the rest of state in an immutable way.

```js
function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
}
```

</details>

### Solution

<details>

<summary> <code> /src/store.js </code> </summary>

```js
import { createStore } from "redux";

const initialState = {
  name: "",
  category: ""
};

export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_NAME:
      return { ...state, name: payload };
    case UPDATE_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
}

export default createStore(reducer);
```

</details>

## Step 3

### Summary

In this step, we'll set up our first view, `Name.js`, to use the action types we just added to our store.

### Instructions

- Open `/src/components/Name/Name.js`.
- Import the `store` and the name and category action types from `/src/store.js`.
- Inside the `saveChanges` method, use the `dispatch` method off of the `store` to send an action object.
  - The object should have a type that matches the name action type that was imported.
  - The object should have a payload that sends the value of the name input box.
- Add another dispatch inside the `saveChanges` method for the category action type similar to the first.

<details>
<summary>Detailed Instructions</summary>

First we need to import the `store` we created into this file, along with the action types we need for this component.

```js
import store, { UPDATE_NAME, UPDATE_CATEGORY } from "./../../store.js";
```

The store is an object with a method on it called `dispatch` that we can use to send actions to the `reducer`. We'll want to use this method twice, once for each piece of data that this component needs to save to Redux. We'll set these up inside the `saveChanges` method that already fires when we click the `Next` button.
```js
saveChanges() {
  store.dispatch();
  store.dispatch();
}
```

Both of these `dispatch` methods will send an action object to the `reducer`. The type of the action objects should match the action types we imported above, and the payload should pull the values of the input boxes from state where they are being stored.
```js
saveChanges() {
  store.dispatch({
    type: UPDATE_NAME,
    payload: this.state.name
  });
  store.dispatch({
    type: UPDATE_CATEGORY,
    payload: this.state.category
  });
}
```


</details>

### Solution

<details>

<summary> <code> /src/components/Name/Name.js </code> </summary>

```js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { UPDATE_NAME, UPDATE_CATEGORY } from "./../../store";
import "./Name.css";

class Name extends Component {
  // Several lines for the constructor and methods omitted
  saveChanges() {
    store.dispatch({
      type: UPDATE_NAME,
      payload: this.state.name
    });
    store.dispatch({
      type: UPDATE_CATEGORY,
      payload: this.state.category
    });
  }
  // Several lines for the render omitted
}
export default Name;
```

</details>

## Step 4

### Summary

At this point, we can save the input values from `Name.js` to Redux, but we aren't using that data to keep our input boxes from clearing. If we hit the `Next` button, and then the `Previous` button, the input boxes still forget what we typed in, so let's hook up our `Name.js` component to use Redux state to remember.

### Instructions

- Inside the `constructor`, use the `getState` method that lives on `store`.
  - Store the return value in a const so we can reference it later.
- Now change the initial state to use the appropriate values off of Redux state instead of empty strings.
  - This means that when the component first mounts it will pull the data we saved earlier.

<details>
<summary>Detailed Instructions</summary>

The store is an object with a method on it called `getState` that we can use to access the Redux state object. We'll invoke this method inside our constructor and store the return value in a constant so we can reference it easily.
```js
const reduxState = store.getState();
```

The reason we are invoking this method in the constructor is so we can use the value in our component's initial state. We will reference the appropriate properties off of the Redux state to replace the empty strings that are in the component's state right now.
```js
this.state = {
  name: reduxState.name,
  category: reduxState.category
};
```

Now when we flip between our pages, we should see our values persist on the `Name.js` view.

</details>

### Solution

<details>

<summary> <code> /src/components/Name/Name.js  </code> </summary>

```js
// imports omitted
class Name extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      name: reduxState.name,
      category: reduxState.category
    };
  }
  // methods and render omitted
}
export default Name
```

</details>

## Step 5

### Summary

In this step, we are going to repeat all the setup we did for `Name.js` for `Author.js`. 

### Instructions

- Open `./src/ducks/counter.js`.
- Create `UNDO` and `REDO` action types.
- Write action creators for `UNDO` and `REDO`.
- Refactor `initialState` and `counter` to handle undo/redo logic.

### Solution

<details>

<summary> <code> ./src/ducks/counter.js </code> </summary>

```js
const initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: []
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const UNDO = "UNDO";
const REDO = "REDO";

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        currentValue: state.currentValue + action.amount,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues]
      };
    case DECREMENT:
      return {
        currentValue: state.currentValue - action.amount,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues]
      };
    case UNDO:
      return {
        currentValue: state.previousValues[0],
        futureValues: [state.currentValue, ...state.futureValues],
        previousValues: state.previousValues.slice(1)
      };
    case REDO:
      return {
        currentValue: state.futureValues[0],
        futureValues: state.futureValues.slice(1),
        previousValues: [state.currentValue, ...state.previousValues]
      };
    default:
      return state;
  }
}

export function increment(amount) {
  return { amount, type: INCREMENT };
}

export function decrement(amount) {
  return { amount, type: DECREMENT };
}

export function undo() {
  return { type: UNDO };
}

export function redo() {
  return { type: REDO };
}
```

</details>

## Step 6

### Summary

In this step, we'll import `undo` and `redo` action creators into our `Counter.js` and hook them up their respective buttons.

### Instructions

- Open `./src/Counter.js`.
- Import `undo` and `redo` action creators.
- Add `undo` and `redo` to `mapDispatchToProps`.
- Destrucuture `undo` and `redo` from `props`.
- Hook up the `undo` and `redo` buttons to their respective action creators.

### Solution

<details>

<summary> <code> ./src/Counter.js </code> </summary>

```js
import React, { Component } from "react";
import { connect } from "react-redux";

import { decrement, increment, redo, undo } from "./ducks/counter";

class Counter extends Component {
  render() {
    const {
      currentValue,
      decrement,
      futureValues,
      increment,
      previousValues,
      redo,
      undo
    } = this.props;
    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button className="counter__button" onClick={() => increment(1)}>
              +1
            </button>
            <button className="counter__button" onClick={() => increment(5)}>
              +5
            </button>
            <button className="counter__button" onClick={() => decrement(1)}>
              -1
            </button>
            <button className="counter__button" onClick={() => decrement(5)}>
              -5
            </button>
            <br />
            <button
              className="counter__button"
              disabled={previousValues.length === 0}
              onClick={undo}
            >
              Undo
            </button>
            <button
              className="counter__button"
              disabled={futureValues.length === 0}
              onClick={redo}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { decrement, increment, redo, undo }
)(Counter);
```

</details>

<br />

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/4g.gif" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
