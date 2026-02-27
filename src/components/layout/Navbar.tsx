import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { logout } from '../../services/auth.service';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, userProfile } = useAuthStore();
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
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-xl hover:text-gray-300">
          🔥 Firebase App
        </a>

        <div className="flex items-center gap-6">
          {user && userProfile ? (
            <>
              <div className="text-sm">
                <span className="text-gray-300">Welcome, </span>
                <span className="font-semibold">{userProfile.name}</span>
              </div>
              <a href="/profile" className="px-3 hover:text-gray-300 transition">
                Profile
              </a>
              <Button
                onClick={handleLogout}
                className="!bg-red-500 hover:!bg-red-600 text-white py-1 px-3 text-sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href="/login" className="px-3 hover:text-gray-300 transition">
                Login
              </a>
              <a href="/register" className="px-3 hover:text-gray-300 transition">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
