import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Loading } from '../components/loading';
import { Post } from '../components/post';
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
      return <Loading message="Loading posts..." />;
    }

    if (!user || !('name' in user)) {
      return <Loading message="No posts found for the provided user" />;
    }

    return (
      <main>
        <Link to="/users">
          <p>Return to the list of users</p>
        </Link>
        <h1>List of posts from {user.name}</h1>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    );
  }
}

export { Posts };
