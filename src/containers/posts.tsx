import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../components/loading';
import { Post } from '../components/post';
import { fetchPosts } from '../services/api';
import { IPost, Status } from '../types/global';

interface PostsState {
  posts: IPost[];
  status: Status;
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
    const { idUser } = params as { idUser: string };

    try {
      const posts = await fetchPosts(idUser);

      this.setState({ posts, status: Status.LOADED });
    } catch (err) {
      this.setState({ status: Status.ERROR });
      alert(err.message);
    }
  };

  render() {
    const { posts, status } = this.state;

    if (status === Status.LOADING) {
      return <Loading message="Loading posts..." />;
    }

    return (
      <main>
        <h1>Posts</h1>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    );
  }
}

export { Posts };
