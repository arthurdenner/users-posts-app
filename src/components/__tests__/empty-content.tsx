import React from 'react';
import { render } from 'react-testing-library';
import { EmptyContent } from '../empty-content';

it('renders the message provided as prop', () => {
  const message = 'Loading...';

  const { getByTestId } = render(<EmptyContent message={message} />);

  expect(getByTestId('empty-content-message')).toHaveTextContent(message);
});

it('renders its children properly', () => {
  const childrenText = 'Find me';
  const { getByText } = render(
    <EmptyContent message="anything">
      <div>{childrenText}</div>
    </EmptyContent>
  );

  expect(getByText(childrenText)).toBeInTheDocument();
});
