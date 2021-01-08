import React from 'react';

import CreateUser from './CreateUser';
import User from './User';

import UserContainer from '../containers/UserContainer';
import CreateUserContainer from '../containers/CreateUserContainer';

const Users = ({ users = [] }) => {
  return (
    <section className="Users">
      <h2>Users</h2>
      <CreateUserContainer />
      {users.map(userId => (
        <UserContainer key={userId} userId={userId} />
      ))}
      { /*
      <CreateUser />
      {users.map((user) => (
        <User />
      ))}
      */}
    </section>
  );
};

export default Users;
