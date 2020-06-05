import React, { useState, useEffect } from 'react';
import CharacterList from './CharacterList';
import dummyData from './dummy-data';
import endpoint from './endpoint';

const initialState = {
  result: null,
  loading: true,
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

const useFetch = url => {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState)

  // cannot send async function to useEffect cuz they return promises
  useEffect(() => {
    dispatch({ type: 'LOADING' });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response } });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error });
      }
    }

    fetchUrl(); // like a immediately evoked function

    /*
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setResponse(response);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
        console.error(error);
      });
    //.catch(console.error);
    */

  }, [])
  // useEffect will be runned in every change of state, wil empty array only will runned one time

  return [response, loading, error];
}

const SWApplication = () => {
  // const [characters, setCharacters] = useState(dummyData);
  const [response, loading, error] = useFetch(endpoint + '/characters'); // can create second param to format data
  const characters = (response && response.characters) || [];

  /*
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('on');
  useEffect(() => {
    setLoading(true);
    setCharacters([]);
    setError(null);
    fetch(endpoint + '/characters')
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setCharacters(response.characters);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
        console.error(error);
      });
    //.catch(console.error);

  }, [])
  // useEffect will be runned in every change of state, wil empty array only will runned one time
  */

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {
            loading ?
              (
                <p>Loading..</p>
              ) : (
                <CharacterList characters={characters} />
              )
          }
          {error && <p>{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

export default SWApplication;
