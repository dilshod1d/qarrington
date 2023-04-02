import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminGuard = ({ children, isAdmin }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/topics');
    }
  }, [isAdmin, router]);

  return isAdmin ? children : null;
};

export default AdminGuard;
