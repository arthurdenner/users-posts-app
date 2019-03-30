import { createLocation, createMemoryHistory } from 'history';
import React from 'react';
import { render, wait } from '../../../test/app-test-utils';
import { fakePost } from '../../components/__tests__/post';
import { fakeUser } from '../../components/__tests__/user';
import { fetchPosts, fetchUserById } from '../../services/api';
import Posts from '../posts';

const mockFetchPosts = fetchPosts as jest.Mock;
const mockFetchUserById = fetchUserById as jest.Mock;
const userId = '1';
const fakeRouteProps = {
  location: createLocation('/'),
  history: createMemoryHistory(),
  match: {
    isExact: true,
    params: { userId },
    path: '/',
    url: '/',
  },
};

jest.mock('../../services/api', () => ({
  fetchPosts: jest.fn(() => Promise.resolve([fakePost])),
  fetchUserById: jest.fn(() => Promise.resolve([fakeUser])),
}));

afterEach(() => {
  mockFetchPosts.mockClear();
});

it('renders the list of posts when the API call is successful', () => {
  const { getByTestId, getByText } = render(<Posts {...fakeRouteProps} />);

  expect(getByTestId('empty-content-message')).toBeInTheDocument();
  wait(() => {
    expect(getByTestId('empty-content-message')).not.toBeInTheDocument();
    expect(getByText(/list of posts from/i)).toBeInTheDocument();
  });

  expect(mockFetchPosts).toHaveBeenCalledTimes(1);
  expect(mockFetchUserById).toHaveBeenCalledTimes(1);
  expect(mockFetchUserById).toHaveBeenCalledWith(userId);
});

it('renders a message when no posts are found to the provided user', () => {
  mockFetchUserById.mockResolvedValueOnce(undefined);
  const { getByTestId, getByText } = render(<Posts {...fakeRouteProps} />);

  expect(getByTestId('empty-content-message')).toBeInTheDocument();
  wait(() => {
    expect(getByText(/no posts found/i)).toBeInTheDocument();
    expect(getByText(/retry/i)).toBeInTheDocument();
  });

  expect(mockFetchPosts).toHaveBeenCalledTimes(1);
});

it('renders the error and a button to try when the API call fails', () => {
  const errorMessage = 'Some error';

  mockFetchPosts.mockRejectedValueOnce({
    message: errorMessage,
  });
  const { getByTestId, getByText } = render(<Posts {...fakeRouteProps} />);

  expect(getByTestId('empty-content-message')).toBeInTheDocument();
  wait(() => {
    expect(getByText(errorMessage)).toBeInTheDocument();
    expect(getByText(/retry/i)).toBeInTheDocument();
  });

  expect(mockFetchPosts).toHaveBeenCalledTimes(1);
});
