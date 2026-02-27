import React from 'react';
import GoogleSignInButton from '../components/features/auth/GoogleSignInButton';
import Layout from '../components/layout/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <GoogleSignInButton />
      </div>
    </Layout>
  );
};

export default LoginPage;