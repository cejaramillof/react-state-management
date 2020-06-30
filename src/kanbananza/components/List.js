import React from 'react';

import Card from './Card';
import CreateCard from './CreateCard';
import CardContainer from '../containers/CardContainer';
import CreateCardContainer from '../containers/CreateCardContainer';

const List = ({ list = {}, removeList }) => {
  return (
    <article className="List">
      <h2>{list.title}</h2>
      {/* <CreateCard /> */}
      <CreateCardContainer listId={list.id} />
      <div>
        {list.cards.map(cardId => (
          <CardContainer key={cardId} cardId={cardId} listId={list.id} />
          /* <Card key={cardId} cardId={cardId} listId={list.id} /> */
        ))}
      </div>
    </article>
  );
};

export default List;
