import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { EmptyContent } from '../components/empty-content';
import { Post } from '../components/post';
import { ReturnToUsers } from '../components/return-to-users';
import useFetch, { Status } from '../hooks/use-fetch';
import { fetchPosts, fetchUserById } from '../services/api';

function Posts({ match }: RouteComponentProps<{ userId: string }>) {
  const { userId } = match.params;
  const memoizedFetch = useCallback(
    () => Promise.all([fetchUserById(userId), fetchPosts(userId)]),
    [userId]
  );
  const { data, error, status, runFetch: getUserAndTheirPosts } = useFetch(
    memoizedFetch,
    [undefined, []]
  );
  const [user, posts] = data;

  if (status === Status.LOADING) {
    return <EmptyContent message="Loading posts..." />;
  }

  if (error) {
    return (
      <EmptyContent message={error}>
        <button onClick={getUserAndTheirPosts}>Retry</button>
      </EmptyContent>
    );
  }

  if (!user) {
    return (
      <EmptyContent message="No posts found for the provided user">
        <ReturnToUsers />
      </EmptyContent>
    );
  }

  return (
    <main>
      <ReturnToUsers />
      <h1>List of posts from {user.name}</h1>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

export default Posts;
