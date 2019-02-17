import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/global';

interface UserProps {
  user: IUser;
}

const User: React.FC<UserProps> = ({ user }) => (
  <div>
    <p>{user.name}</p>
    <Link to={`/users/${user.id}`}>See posts from this user</Link>
  </div>
);

export { User };
