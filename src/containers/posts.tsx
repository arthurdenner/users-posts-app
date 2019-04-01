import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { EmptyContent } from '../components/empty-content';
import { Post } from '../components/post';
import { ReturnToUsers } from '../components/return-to-users';
import { fetchPosts, fetchUserById } from '../services/api';
import { IPost, IUser } from '../types/global';

enum Status {
  ERROR,
  LOADING,
  LOADED,
}

function Posts({ match }: RouteComponentProps) {
  const { params } = match;
  const { userId } = params as { userId: string };
  const [status, setStatus] = useState(Status.LOADING);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const memoizedGetUserAndTheirPosts = useCallback(() => {
    async function getUserAndTheirPosts() {
      try {
        setStatus(Status.LOADING);

        const [userResponse, postsResponse] = await Promise.all([
          fetchUserById(userId),
          fetchPosts(userId),
        ]);

        setStatus(Status.LOADED);
        setPosts(postsResponse);
        setUser(userResponse);
      } catch (err) {
        setError(err.message);
        setStatus(Status.ERROR);
      }
    }

    getUserAndTheirPosts();
  }, [userId]);

  useEffect(() => {
    memoizedGetUserAndTheirPosts();
  }, [memoizedGetUserAndTheirPosts]);

  if (status === Status.LOADING) {
    return <EmptyContent message="Loading posts..." />;
  }

  if (error) {
    return (
      <EmptyContent message={error}>
        <button onClick={memoizedGetUserAndTheirPosts}>Retry</button>
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
