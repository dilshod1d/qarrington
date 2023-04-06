import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminGuard = ({ children, isAdmin }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      console.log('user is not admin', isAdmin);
      router.push('/topics');
    }
  }, [isAdmin, router]);

  return isAdmin ? children : null;
};

export default AdminGuard;
