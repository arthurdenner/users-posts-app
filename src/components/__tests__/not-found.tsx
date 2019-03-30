import React from 'react';
import { render } from '../../../test/app-test-utils';
import NotFoundPage from '../not-found';

it("renders a message notifying that the page doesn't exist", () => {
  const { getByText } = render(<NotFoundPage />);

  expect(getByText(/page doesn't exist/i)).toBeInTheDocument();
});
