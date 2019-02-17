import React from 'react';
import { EmptyContent } from './empty-content';
import { ReturnToUsers } from './return-to-users';

const NotFoundPage = () => (
  <EmptyContent message="This page doesn't exist">
    <ReturnToUsers />
  </EmptyContent>
);

export { NotFoundPage };
