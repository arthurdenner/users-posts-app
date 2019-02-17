import React from 'react';
import { render } from '../../../test/app-test-utils';
import { User } from '../user';
import { IUser } from '../../types/global';

export const fakeUser: IUser = {
  id: 1,
  name: 'Some name',
  username: 'Some username',
  email: 'Some email',
  phone: 'Some phone',
  website: 'Some website',
  address: {
    street: 'Some street',
    suite: 'Some suite',
    city: 'Some city',
    zipcode: 'Some zipcode',
    geo: {
      lat: 'Some lat',
      lng: 'Some lng',
    },
  },
  company: {
    name: 'Some company',
    bs: 'Some bs',
    catchPhrase: 'Some catchPhrase',
  },
};

it('renders the properties of the user provided as prop', () => {
  const { getByText } = render(<User user={fakeUser} />);

  expect(getByText(fakeUser.name)).toBeInTheDocument();
  expect(getByText(fakeUser.email)).toBeInTheDocument();
  expect(getByText(fakeUser.phone)).toBeInTheDocument();
  expect(getByText(fakeUser.website)).toBeInTheDocument();
  expect(
    getByText(fakeUser.address.city, { exact: false })
  ).toBeInTheDocument();
  expect(
    getByText(fakeUser.company.name, { exact: false })
  ).toBeInTheDocument();
});
