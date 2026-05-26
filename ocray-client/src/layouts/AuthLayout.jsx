import { Link, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignUp = pathname.includes('/signup');

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f3c783] via-[#e8b0bb] to-[#8aa8f2] p-4 sm:p-8">
      <div className="mx-auto w-full max-w-[1400px] overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#6e56f5] via-[#5a72ff] to-[#4eb8ff] shadow-[0_24px_70px_rgba(24,24,27,0.25)]">
        <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-2">
          <div className="relative flex items-center justify-center p-6 sm:p-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-25" />
            <div className="relative w-full max-w-md -rotate-[5deg] rounded-[2rem] bg-white p-7 shadow-[0_24px_70px_rgba(24,24,27,0.22)]">
              <Outlet />
            </div>
          </div>

          <aside className="flex items-center p-8 sm:p-12">
            <div className="text-white">
              <h2 className="text-5xl font-extrabold leading-[1.05] sm:text-7xl">
                Perfect
                <br />
                {isSignUp ? 'signup' : 'login'}
              </h2>

              <ul className="mt-8 space-y-3 text-2xl sm:text-4xl">
                <li>◦ Universal</li>
                <li>◦ High conversion</li>
                <li>◦ Desktop &amp; Mobile</li>
              </ul>

              <div className="mt-10 inline-flex items-center rounded-full bg-black px-7 py-3 text-2xl font-semibold">
                
              </div>

              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex rounded-xl border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Back Home
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;