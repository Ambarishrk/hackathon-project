import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Firebase App</h1>
      <p className="text-lg text-gray-600 mb-8">The best place to share your thoughts.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Register
        </Link>
      </div>
    </div>
  );
}
