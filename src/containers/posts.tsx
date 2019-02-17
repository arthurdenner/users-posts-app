import React from 'react';
import { RouteComponentProps } from 'react-router';
import { EmptyContent } from '../components/empty-content';
import { Post } from '../components/post';
import { ReturnToUsers } from '../components/return-to-users';
import { fetchPosts, fetchUserById } from '../services/api';
import { IPost, IUser, Status } from '../types/global';

interface PostsState {
  posts: IPost[];
  status: Status;
  user?: IUser;
}

class Posts extends React.Component<RouteComponentProps, PostsState> {
  state: PostsState = {
    posts: [],
    status: Status.LOADING,
  };

  async componentDidMount() {
    await this.fetchPosts();
  }

  fetchPosts = async () => {
    const {
      match: { params },
    } = this.props;
    const { userId } = params as { userId: string };

    try {
      const [user, posts] = await Promise.all([
        fetchUserById(userId),
        fetchPosts(userId),
      ]);

      this.setState({ posts, user, status: Status.LOADED });
    } catch (err) {
      this.setState({ status: Status.ERROR });
      alert(err.message);
    }
  };

  render() {
    const { posts, status, user } = this.state;

    if (status === Status.LOADING) {
      return <EmptyContent message="Loading posts..." />;
    }

    if (!user || !('name' in user)) {
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
}

export { Posts };
