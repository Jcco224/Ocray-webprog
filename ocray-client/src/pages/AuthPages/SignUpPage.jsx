import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-300';

const SignUpPage = () => {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-black bg-zinc-100">
      <div className="border-b border-black bg-zinc-100 px-7 py-6 text-black">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-600">New Profile</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Sign Up</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          Create your account and start reading technical write-ups and project updates.
        </p>
      </div>

      <form className="space-y-5 bg-zinc-100 px-7 py-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-zinc-800">First Name</label>
            <input id="first-name" type="text" placeholder="John" autoComplete="given-name" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-800">Last Name</label>
            <input id="last-name" type="text" placeholder="Ocray" autoComplete="family-name" className={inputClasses} />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-800">Email</label>
          <input id="signup-email" type="email" placeholder="you@example.com" autoComplete="email" className={inputClasses} />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-800">Password</label>
          <input id="signup-password" type="password" placeholder="Create your password" autoComplete="new-password" className={inputClasses} />
          <p className="mt-2 text-xs leading-5 text-zinc-600">Use a secure password with letters, numbers, and symbols.</p>
        </div>

        <button type="submit" className="w-full rounded-xl border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800">
          Create Account
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button type="button" className="w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition hover:bg-zinc-200">
            Sign Up with Google
          </button>
          <button type="button" className="w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 transition hover:bg-zinc-200">
            Sign Up with Apple
          </button>
        </div>

        <div className="border-t border-black pt-6 text-center text-sm text-zinc-700">
          Already have an account? <Link to="/auth/signin" className="font-semibold text-black underline">Log In</Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
