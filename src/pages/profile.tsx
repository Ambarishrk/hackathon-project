import Layout from '../components/layout/Layout';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { userProfile } = useAuthStore();
  const navigate = useNavigate();

  if (!userProfile) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center items-center py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>

          <div className="space-y-4 mb-6">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 uppercase tracking-wide">Name</p>
              <p className="text-lg font-semibold text-gray-800">{userProfile.name}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 uppercase tracking-wide">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userProfile.email}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 uppercase tracking-wide">Role</p>
              <p className="text-lg font-semibold text-gray-800 capitalize">{userProfile.role}</p>
            </div>

            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 uppercase tracking-wide">Bio</p>
              <p className="text-lg text-gray-800">{userProfile.bio || 'No bio added yet'}</p>
            </div>

            {userProfile.createdAt && (
              <div className="pb-4">
                <p className="text-sm text-gray-600 uppercase tracking-wide">Member Since</p>
                <p className="text-lg text-gray-800">
                  {new Date(userProfile.createdAt.seconds * 1000).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => navigate('/')}
              variant="secondary"
              className="flex-1"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

