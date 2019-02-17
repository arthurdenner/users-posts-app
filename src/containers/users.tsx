import React from 'react';
import { EmptyContent } from '../components/empty-content';
import { User } from '../components/user';
import { fetchUsers } from '../services/api';
import { Status, IUser } from '../types/global';

interface UsersState {
  error?: string;
  status: Status;
  users: IUser[];
}

class Users extends React.Component<{}, UsersState> {
  state: UsersState = {
    status: Status.LOADING,
    users: [],
  };

  async componentDidMount() {
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      this.setState({ status: Status.LOADING });

      const users = await fetchUsers();

      this.setState({ users, status: Status.LOADED });
    } catch (err) {
      this.setState({ error: err.message, status: Status.ERROR });
    }
  };

  render() {
    const { error, status, users } = this.state;

    if (status === Status.LOADING) {
      return <EmptyContent message="Loading users..." />;
    }

    if (error) {
      return (
        <EmptyContent message={error}>
          <button onClick={this.fetchUsers}>Retry</button>
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
  }
}

export { Users };
