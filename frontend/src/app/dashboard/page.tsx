'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BASE_URL } from '@/service/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !token) {
      router.push('/');
    }
  }, [token, isCheckingAuth, router]);

  const handleTodoForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Authentication token not found. Please sign in again.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${BASE_URL}/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create todo');
      }

      const data = await response.json();
      console.log('Todo created:', data);
      setSuccess(true);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating todo:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );

      if (err instanceof Error && err.message.includes('Unauthorized')) {
        localStorage.removeItem('authToken');
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto p-4 h-screen flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <form onSubmit={handleTodoForm} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
              minLength={3}
              maxLength={50}
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              maxLength={200}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !title.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              loading || !title.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating...' : 'Create Todo'}
          </button>
          <Link
            href="/"
            className="text-blue-600 hover:underline ml-4 py-2 px-4 rounded border border-blue-600"
          >
            Back
          </Link>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Todo created successfully!
            </div>
          )}
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
