import React, { useState, useEffect, useReducer, useCallback } from 'react';
import CharacterList from './CharacterList';
import dummyData from './dummy-data';
import endpoint from './endpoint';

const initialState = {
  result: null,
  loading: false,
  error: null,
}

const fetchReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      result: null,
      loading: true,
      error: null,
    }
  }
  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.response,
      loading: false,
      error: null,
    }
  }
  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    }
  }
  return state;
}

const fetchCharacters = (dispatch) => {
  dispatch({ type: 'LOADING' })
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response => dispatch({
      type: 'RESPONSE_COMPLETE',
      payload: { response: response.characters }
    }))
    .catch(error => dispatch({ type: 'ERROR', payload: { error: error.message } }))
}

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhanceDispatch = useCallback(action => {
    console.log(action);
    if (typeof action === 'function') { // functio action is a thunk
      action(dispatch);
    } else { // normal action is a object
      dispatch(action);
    }
  }, [dispatch]);

  // return [state, dispatch];
  return [state, enhanceDispatch];
}

const SWApplicationThunk = () => {
  const [state, dispatch] = useThunkReducer(fetchReducer, initialState);
  const { result, loading, error } = state;

  useEffect(() => {
    dispatch(dispatch => { })
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>GetAll</button>
          {
            loading && <p>Loading..</p>
          }
          {
            !loading && result && <CharacterList characters={result} />
          }
          {error && <p>{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

export default SWApplicationThunk;
