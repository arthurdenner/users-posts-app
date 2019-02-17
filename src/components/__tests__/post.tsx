import React from 'react';
import { render } from 'react-testing-library';
import { Post } from '../post';
import { IPost } from '../../types/global';

export const fakePost: IPost = {
  body: 'Some body',
  id: 1,
  title: 'Some title',
  userId: 123,
};

it('renders the title and body of the post provided as prop', () => {
  const { getByText } = render(<Post post={fakePost} />);

  expect(getByText(fakePost.title)).toBeInTheDocument();
  expect(getByText(fakePost.body)).toBeInTheDocument();
});
