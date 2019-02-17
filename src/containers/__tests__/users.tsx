import React from 'react';
import { fetchUsers } from '../../services/api';
import { render, wait } from '../../../test/app-test-utils';
import { fakeUser } from '../../components/__tests__/user';
import { Users } from '../users';

const mockFetchUsers = fetchUsers as jest.Mock;

jest.mock('../../services/api', () => ({
  fetchUsers: jest.fn(() => Promise.resolve([fakeUser])),
}));

afterEach(() => {
  mockFetchUsers.mockClear();
});

it('renders the list of users when the API call is successful', () => {
  const { getByTestId, getByText } = render(<Users />);

  expect(getByTestId('empty-content-message')).toBeInTheDocument();
  wait(() => {
    expect(getByTestId('empty-content-message')).not.toBeInTheDocument();
    expect(getByText(/list of users/i)).toBeInTheDocument();
  });

  expect(mockFetchUsers).toHaveBeenCalledTimes(1);
});

it('renders the error and a button to retry when the API call fails', () => {
  const errorMessage = 'Some error';

  mockFetchUsers.mockRejectedValueOnce({
    message: errorMessage,
  });
  const { getByTestId, getByText } = render(<Users />);

  expect(getByTestId('empty-content-message')).toBeInTheDocument();
  wait(() => {
    expect(getByText(errorMessage)).toBeInTheDocument();
    expect(getByText(/retry/i)).toBeInTheDocument();
  });

  expect(mockFetchUsers).toHaveBeenCalledTimes(1);
});
