import React from 'react';
import { IPost } from '../../types/global';

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => <div>{post.title}</div>;

export { Post };
