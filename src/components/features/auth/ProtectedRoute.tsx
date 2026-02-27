import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import Spinner from '../../ui/Spinner';

interface Props {
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({ requiredRole }: Props) {
  const { user, loading, userProfile } = useAuthStore();

  if (loading) return <Spinner fullscreen />;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole === 'admin' && userProfile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
