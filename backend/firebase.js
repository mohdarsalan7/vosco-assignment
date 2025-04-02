import { readFile } from 'fs/promises';
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// const firebaseConfig = JSON.parse(
//   await readFile(new URL('./firebaseService.json', import.meta.url)),
// );

const firebaseConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') + '\n',
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: 'googleapis.com',
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export default admin;
