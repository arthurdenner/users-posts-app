import React from 'react';
import { render } from 'react-testing-library';
import { Loading } from '../loading';

it('renders the message provided as prop', () => {
  const loadingMessage = 'Loading...';

  const { getByTestId } = render(<Loading message={loadingMessage} />);

  expect(getByTestId('loading-message')).toHaveTextContent(loadingMessage);
});
