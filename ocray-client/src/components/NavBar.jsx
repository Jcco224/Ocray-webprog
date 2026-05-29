import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const getNavLinkClassName = (variant) => ({ isActive }) => {
  if (variant === 'minimal') {
    return [
      'rounded-full px-4 py-2 text-sm font-medium transition duration-200',
      isActive
        ? 'bg-black text-white'
        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
    ].join(' ');
  }
  return [
    'border-b px-2 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition duration-200',
    isActive
      ? 'border-black text-black'
      : 'border-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-900',
  ].join(' ');
};

const NavBar = ({ variant = 'default' }) => {
  const isMinimal = variant === 'minimal';

  if (isMinimal) {
    return (
      <header className="sticky top-0 z-30 border-b border-black bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black text-sm font-semibold text-black">
              O
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-900">
              Ocray
            </span>
          </NavLink>

          <nav className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={getNavLinkClassName('minimal')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 border-b border-black bg-white px-6 py-6 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <NavLink to="/" className="w-fit">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black text-xs font-bold text-black">
              JCO
            </span>
            <h1 className="text-lg font-bold uppercase tracking-[0.18em] text-black">
              John Carlo Ocray
            </h1>
          </div>
        </NavLink>

        <div className="flex flex-wrap items-center gap-6">
          <nav className="flex w-fit flex-wrap items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={getNavLinkClassName('default')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/auth/signin"
              className="rounded-xl border border-black bg-white px-5 py-2.5 text-sm font-semibold !text-black transition hover:-translate-y-0.5 hover:bg-zinc-100"
            >
              Log In
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="rounded-xl border border-black bg-black px-5 py-2.5 text-sm font-semibold !text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
