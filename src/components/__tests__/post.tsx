import React from 'react';
import { render } from 'react-testing-library';
import { Post } from '../post';
import { IPost } from '../../types/global';

it('renders the title and body of the post provided as prop', () => {
  const fakePost: IPost = {
    body: 'Some body',
    id: 1,
    title: 'Some title',
    userId: 123,
  };
  const { getByText } = render(<Post post={fakePost} />);

  expect(getByText(fakePost.title)).toBeInTheDocument();
  expect(getByText(fakePost.body)).toBeInTheDocument();
});
