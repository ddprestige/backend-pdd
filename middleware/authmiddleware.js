import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(403);
  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.adminId = decoded.id;
    next();
  } catch {
    return res.sendStatus(403);
  }
};

export default authMiddleware;
