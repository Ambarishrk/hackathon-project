import RegisterForm from '../components/features/auth/RegisterForm';
import Layout from '../components/layout/Layout';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center py-12">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
