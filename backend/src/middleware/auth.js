export const isAuthenticated = (req, res, next) => {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: 'Authentication required' });
};

export const isAdmin = (req, res, next) => {
  if (req.session?.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin privileges required' });
};
