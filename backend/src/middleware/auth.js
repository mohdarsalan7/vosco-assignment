import admin from '../../firebase.js';
import User from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the ID token first
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Get the user record to access custom claims
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    // Add user information to request object
    req.user = {
      ...decodedToken,
      uid: decodedToken.uid,
      email: userRecord.email,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findOne({ uid: req.user?.uid });
  if (!user?.role || user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  next();
};
