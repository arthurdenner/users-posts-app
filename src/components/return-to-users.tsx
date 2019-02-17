import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToUsers = () => (
  <Link className="return-to" to="/users">
    <p>Return to the list of users</p>
  </Link>
);

export { ReturnToUsers };
