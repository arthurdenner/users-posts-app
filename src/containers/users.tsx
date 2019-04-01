import React from 'react';
import { EmptyContent } from '../components/empty-content';
import { User } from '../components/user';
import useFetch, { Status } from '../hooks/use-fetch';
import { fetchUsers } from '../services/api';

const Users = () => {
  const { data: users, error, status, runFetch: getUsers } = useFetch(
    fetchUsers,
    []
  );

  if (status === Status.LOADING) {
    return <EmptyContent message="Loading users..." />;
  }

  if (error) {
    return (
      <EmptyContent message={error}>
        <button onClick={getUsers}>Retry</button>
      </EmptyContent>
    );
  }

  return (
    <main>
      <h1>List of users</h1>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </main>
  );
};

export default Users;
