import React from 'react';
import { EmptyContent } from '../components/empty-content';
import { User } from '../components/user';
import { fetchUsers } from '../services/api';
import { Status, IUser } from '../types/global';

interface UsersState {
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
      const users = await fetchUsers();

      this.setState({ users, status: Status.LOADED });
    } catch (err) {
      this.setState({ status: Status.ERROR });
      alert(err.message);
    }
  };

  render() {
    const { status, users } = this.state;

    if (status === Status.LOADING) {
      return <EmptyContent message="Loading users..." />;
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
