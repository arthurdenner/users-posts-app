import { IPost, IUser } from '../types/global';

const getUrl = (endpoint: string) =>
  `https://jsonplaceholder.typicode.com/${endpoint}`;

export const fetchUsers = (): Promise<IUser[]> =>
  fetch(getUrl('users')).then(response => response.json());

export const fetchUserById = (userId: string): Promise<IUser | undefined> =>
  fetch(getUrl(`users/${userId}`))
    .then(response => response.json())
    .then(user => (!user.id ? undefined : user));

export const fetchPosts = (userId: string): Promise<IPost[]> =>
  fetch(getUrl(`posts?userId=${userId}`)).then(response => response.json());
