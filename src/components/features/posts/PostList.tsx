import React from 'react';

interface Post {
  id: string;
  title?: string;
  content?: string;
  [key: string]: unknown;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts.length) return <p className="text-gray-500">No posts found.</p>;
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 shadow-sm">
          <h2 className="font-bold text-lg">{post.title ?? 'Untitled'}</h2>
          {post.content && <p className="text-gray-600 mt-1">{String(post.content)}</p>}
        </div>
      ))}
    </div>
  );
};

export default PostList;