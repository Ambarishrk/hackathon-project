import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/posts.service';
import PostList from '../components/features/posts/PostList';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';

export default function PostsPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts(10),
  });

  if (isLoading) return <Spinner />;

  if (isError) return (
    <div className="text-red-500 p-4">
      Error: {error.message}
    </div>
  );

  if (!data?.data.length) return (
    <div className="text-center py-20">
      <p className="text-gray-500">No posts yet.</p>
      <Button onClick={() => {}}>Create First Post</Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Button>New Post</Button>
      </div>

      <PostList posts={data.data} />

      {data.hasMore && (
        <button onClick={() => setPage(p => p + 1)} className="mt-4">
          Load More
        </button>
      )}
    </div>
  );
}
