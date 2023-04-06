// import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
// import { authOptions } from '../pages/api/auth/[...nextauth]';

export async function protectRoute(req, res, next) {
  // const session = await getServerSession(req, res, authOptions);
  const session = await getSession({ req });

  if (!session || !session.user) {
    res.redirect('/account/access');
    return;
  }

  if (!session.user.isAdmin && req.url.startsWith('/api/')) {
    res.redirect('/account');
    return;
  }

  next();
}
