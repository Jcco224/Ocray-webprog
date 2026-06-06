import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-300';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const { data } = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);

      const userType = String(data.type || '').toLowerCase();
      const destination = userType === 'admin' || userType === 'editor'
        ? '/dashboard'
        : '/';

      navigate(destination, {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Cannot reach the login server. Make sure the backend is running on port 8000.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-black bg-zinc-100">
      <div className="border-b border-black bg-zinc-100 px-7 py-6 text-black">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-600">
          Account Access
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Log In</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          Sign in to manage articles, users, and dashboard activity.
        </p>
      </div>

      <form className="space-y-5 bg-zinc-100 px-7 py-7" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-zinc-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
        </div>

        {error ? (
          <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-60"
        >
          {loading ? 'Signing In...' : 'Log In'}
        </button>

        <div className="border-t border-black pt-6 text-center text-sm text-zinc-700">
          Need an account?{' '}
          <Link to="/auth/signup" className="font-semibold text-black underline">
            Create one
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SignInPage;
