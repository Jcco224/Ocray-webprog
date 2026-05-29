import { Link, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignUp = pathname.includes('/signup');

  return (
    <section className="min-h-screen bg-zinc-200 p-4 sm:p-8">
      <div className="mx-auto grid min-h-[780px] w-full max-w-7xl grid-cols-1 overflow-hidden rounded-[2rem] border border-black bg-zinc-100 lg:grid-cols-2">
        <div className="relative border-b border-black bg-zinc-100 p-8 lg:border-b-0 lg:border-r lg:p-12">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Secure Access
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-black sm:text-5xl">
              {isSignUp ? 'Build Your Identity' : 'Welcome Back Engineer'}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-zinc-700">
              John Carlo Ocray portfolio access for web development and network engineering articles.
            </p>

            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
              alt="Network hardware and engineering workspace"
              className="mt-10 h-56 w-full rounded-2xl border border-black object-cover"
            />

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ['12', 'Projects'],
                ['24', 'Articles'],
                ['99%', 'Uptime'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-black bg-zinc-50 px-4 py-3">
                  <p className="text-lg font-bold text-black">{value}</p>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-600">{label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/"
              className="mt-8 inline-flex rounded-lg border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-100"
            >
              Back Home
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-xl rounded-[1.75rem] border border-black bg-zinc-100 p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
