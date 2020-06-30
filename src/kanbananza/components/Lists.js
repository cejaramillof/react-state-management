import React from 'react';
import List from './List';
import ListContainer from '../containers/ListContainer';

const Lists = ({ lists = [] }) => {
  return (
    <section className="Lists">
      {
        /*
        lists.map((list) => (
          <List />
        ))}
        */
        lists.map((listId) => (
          <ListContainer key={listId} listId={listId} />
        ))}
    </section>
  );
};

export default Lists;
