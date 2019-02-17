import React from 'react';
import { Link } from 'react-router-dom';
import styles from './return-to-users.less';

const ReturnToUsers = () => (
  <Link className={styles.container} to="/users">
    <p>Return to the list of users</p>
  </Link>
);

export { ReturnToUsers };
