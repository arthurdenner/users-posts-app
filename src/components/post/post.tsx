import React from 'react';
import { IPost } from '../../types/global';
import styles from './post.less';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => (
  <div className={styles.container}>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </div>
);

export { Post };
