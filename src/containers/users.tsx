import React, { useEffect, useState } from 'react';
import { EmptyContent } from '../components/empty-content';
import { User } from '../components/user';
import { fetchUsers } from '../services/api';
import { IUser } from '../types/global';

enum Status {
  ERROR,
  LOADING,
  LOADED,
}

const Users = () => {
  const [status, setStatus] = useState(Status.LOADING);
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  async function getUsers() {
    try {
      setStatus(Status.LOADING);

      const usersResponse = await fetchUsers();

      setStatus(Status.LOADED);
      setUsers(usersResponse);
    } catch (err) {
      setError(err.message);
      setStatus(Status.ERROR);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

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

export { Users };
