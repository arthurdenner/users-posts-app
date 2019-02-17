import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/global';
import styles from './user.less';

interface UserProps {
  user: IUser;
}

const User: React.FC<UserProps> = ({ user }) => (
  <div className={styles.container}>
    <Link to={`/users/${user.id}/posts`}>
      <h2>{user.name}</h2>
    </Link>
    <a href={`mailto:${user.email}`}>
      <small>{user.email}</small>
    </a>
    <a
      href={`https://${user.website}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <small>{user.website}</small>
    </a>
    <small>{user.phone}</small>
    <p>Works at {user.company.name}</p>
    <p>Lives in {user.address.city}</p>
    <Link to={`/users/${user.id}/posts`}>
      <p>See their posts</p>
    </Link>
  </div>
);

export { User };
