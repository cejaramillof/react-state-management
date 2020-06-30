import React from 'react';

import Users from './Users';
import CreateList from './CreateList';
import Lists from './Lists';

import '../index.scss';
import ListsContainers from '../containers/ListsContainers';

const Application = () => {
  return (
    <main className="Application">
      <Users />
      <section>
        <CreateList />
        <ListsContainers /> {/* <Lists /> */}
      </section>
    </main>
  );
};

export default Application;
