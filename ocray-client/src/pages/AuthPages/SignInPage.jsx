import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-950 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-4 focus:ring-zinc-100';

const SignInPage = () => {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.12)]">
      <div className="border-b border-zinc-200 bg-zinc-950 px-7 py-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-400">
          Welcome Back
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Log In
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Access your account with a clean monochrome sign-in experience.
        </p>
      </div>

      <form className="space-y-5 px-7 py-7">
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
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-zinc-700 transition hover:text-zinc-900"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-zinc-950/15 transition hover:-translate-y-0.5 hover:bg-black focus:outline-none focus:ring-4 focus:ring-zinc-200"
        >
          Log In
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button
            type="button"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
          >
            Log In with Google
          </button>
          <button
            type="button"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
          >
            Log In with Apple
          </button>
        </div>

        <div className="border-t border-zinc-200 pt-6 text-center text-sm text-zinc-600">
          No account yet?{' '}
          <Link
            to="/auth/signup"
            className="font-semibold text-zinc-950 transition hover:text-zinc-600"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
