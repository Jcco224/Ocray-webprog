import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_CREDENTIALS, loginAdmin } from '../../utils/adminAuth';

const inputClasses =
  'mt-2 w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-300';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = loginAdmin(email, password);

    if (!success) {
      setError('Invalid admin credentials. Use the default admin login below.');
      return;
    }

    setError('');
    navigate('/dashboard');
  };

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-black bg-zinc-100">
      <div className="border-b border-black bg-zinc-100 px-7 py-6 text-black">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-600">
          Node Login
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Log In</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          Enter your credentials to access the network engineer and web dev portal.
        </p>
      </div>

      <form className="space-y-5 bg-zinc-100 px-7 py-7" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-black bg-zinc-50 p-4 text-sm text-zinc-800">
          <p className="font-semibold uppercase tracking-[0.18em]">Default Admin</p>
          <p className="mt-2">Email: {ADMIN_CREDENTIALS.email}</p>
          <p>Password: {ADMIN_CREDENTIALS.password}</p>
        </div>

        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-zinc-800">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-600">Use at least 8 characters with letters, numbers, and symbols.</p>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-700">
            <input type="checkbox" className="h-4 w-4 rounded border-black accent-black" />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium text-zinc-700 transition hover:text-black">
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="w-full rounded-xl border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800">
          Log In
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button type="button" className="w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition hover:bg-zinc-200">
            Log In with Google
          </button>
          <button type="button" className="w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition hover:bg-zinc-200">
            Log In with Apple
          </button>
        </div>

        <div className="border-t border-black pt-6 text-center text-sm text-zinc-700">
          No account yet? <Link to="/auth/signup" className="font-semibold text-black underline">Sign Up</Link>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
