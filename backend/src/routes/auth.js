import express from 'express';
import admin from '../../firebase.js';
import User from '../models/user.model.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'xyz14082002@gmail.com',
    pass: process.env.GMAIL_PASS || 'hlqqbllylvrzaiyx',
  },
});

router.post('/login', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture: photoURL, firebase } = decodedToken;

    if (!email) throw new Error('Email not found in token');

    const existingUser = await User.findOne({ uid });
    const userRecord = await admin.auth().getUser(uid);
    const role = existingUser?.role || userRecord.customClaims?.role || 'user';

    const user = await User.findOneAndUpdate(
      { uid },
      {
        email,
        name,
        photoURL,
        provider: firebase.sign_in_provider,
        lastLogin: new Date(),
        ...(!existingUser && { role }),
      },
      { upsert: true, new: true },
    );

    const mailOptions = {
      from: `"Your App Name" <xyz14082002@gmail.com>`,
      to: email,
      subject: 'Welcome to Our App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome, ${name || 'User'}!</h2>
          <p>Thank you for signing in to our application.</p>
          <p style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; word-wrap: break-word;">${token}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);

    res.status(200).json({
      user: {
        uid: user.uid,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      message: error instanceof Error ? error.message : 'Authentication failed',
      code: 'AUTH_ERROR',
    });
  }
});

router.get('/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

export default router;
