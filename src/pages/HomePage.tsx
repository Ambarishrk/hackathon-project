import { useAuthStore } from '../store/authStore';
import { logout } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function HomePage() {
  const { userProfile } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome!</h1>
          <p className="text-lg text-gray-600 mb-4 text-center">
            Welcome to the Firebase App
          </p>
          
          {userProfile && (
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <p className="text-gray-700">
                <span className="font-bold">Name:</span> {userProfile.name}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Email:</span> {userProfile.email}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/profile')}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              View Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

