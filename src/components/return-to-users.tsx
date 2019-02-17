import React from 'react';
import { Link } from 'react-router-dom';

const ReturnToUsers = () => (
  <Link className="return-to" data-testid="return-to-users" to="/users">
    <p>Return to the list of users</p>
  </Link>
);

export { ReturnToUsers };
