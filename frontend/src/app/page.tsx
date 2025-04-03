'use client';

import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/Loader';
import Link from 'next/link';
import TodoList from '@/components/TodoList';
import GoogleIcon from '@/assets/google.png';
import { BASE_URL } from '@/service/api';

interface CustomUser {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  provider: string;
  role: string;
  displayName: string;
}

export default function AuthPage() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('authToken', token);

        // Fetch user role after authentication
        try {
          const response = await fetch(`${BASE_URL}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserRole(data.role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }

        setUser({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          photoURL: user.photoURL || '',
          provider: user.providerData[0]?.providerId || '',
          role: userRole || '',
          displayName: user.displayName || '',
        });
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userRole]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token);

      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error('Failed to save user data');

      const data = await response.json();
      setUserRole(data.user.role);

      setUser({
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        photoURL: user.photoURL || '',
        provider: user.providerData[0]?.providerId || '',
        role: data.user.role,
        displayName: user.displayName || '',
      });
    } catch (error: unknown) {
      console.error('Error signing in:', error);
      localStorage.removeItem('authToken');
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('authToken');
      setUserRole(null);
      router.push('/');
    } catch (error: unknown) {
      console.error('Error signing out:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {user ? 'Welcome!' : 'Sign In'}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {user ? (
          <div className="flex flex-col items-center space-y-4">
            {user.photoURL && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <h2 className="text-xl font-semibold text-gray-700">
              {user.displayName || 'User'}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.role}</p>

            {userRole === 'admin' && (
              <Link
                href="/dashboard"
                className="w-full py-2 px-4 rounded-md font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white text-center"
              >
                Go to Dashboard
              </Link>
            )}

            <button
              onClick={handleSignOut}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>

            <TodoList />
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {loading ? (
              'Signing in...'
            ) : (
              <>
                <Image
                  src={GoogleIcon}
                  alt="Google"
                  width={24}
                  height={24}
                  className="mr-2"
                />{' '}
                Sign in with Google
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
