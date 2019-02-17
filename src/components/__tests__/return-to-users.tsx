import React from 'react';
import { render } from '../../../test/app-test-utils';
import { ReturnToUsers } from '../return-to-users';

it('renders a message and a link to return to the list of users', () => {
  const { getByTestId } = render(<ReturnToUsers />);
  const returnLink = getByTestId('return-to-users');

  expect(returnLink.innerHTML).toMatch(/return to the list of users/i);
  expect(returnLink).toHaveAttribute('href', '/users');
});
