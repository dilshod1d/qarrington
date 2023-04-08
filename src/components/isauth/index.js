import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthGuard = ({ children, status }) => {
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('User authenticated', status);
      router.push('/account');
    }
  }, [status, router]);

  return status !== 'authenticated' ? children : null;
};

export default AuthGuard;
