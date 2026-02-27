import GoogleSignInButton from '../components/features/auth/GoogleSignInButton';
import LoginForm from '../components/features/auth/LoginForm';
import Layout from '../components/layout/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center py-12">
        <div className="w-full max-w-md">
          <LoginForm />
          
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-600 text-sm">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
