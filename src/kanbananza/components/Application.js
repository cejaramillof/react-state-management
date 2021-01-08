import React from 'react';

import Users from './Users';
import Lists from './Lists';
import CreateList from './CreateList';
import UsersContainer from '../containers/UsersContainer';
import ListsContainers from '../containers/ListsContainers';
import CreateListContainer from '../containers/CreateListContainer';

import '../index.scss';

const Application = () => {
  return (
    <main className="Application">
      { /* <Users /> */}
      <UsersContainer />
      <section>
        <CreateListContainer />
        <ListsContainers />
        { /* <CreateList /> */}
        {/* <Lists /> */}
      </section>
    </main>
  );
};

export default Application;
