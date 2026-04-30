import { NavLink } from 'react-router-dom';
import panicImage from '../assets/images/Panic.png';

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
        ? 'bg-neutral-950 text-white'
        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
    ].join(' ');
  }
  return [
    'border-b px-2 py-2 text-sm font-medium transition duration-200',
    isActive
      ? 'border-zinc-400 text-zinc-900'
      : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900',
  ].join(' ');
};

const NavBar = ({ variant = 'default' }) => {
  const isMinimal = variant === 'minimal';

  if (isMinimal) {
    return (
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-sm font-semibold text-neutral-950">
              O
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-700">
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
    <header className="sticky top-0 z-20 border-b border-zinc-100 bg-white px-6 py-6 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <NavLink to="/" className="w-fit">
          <div className="flex items-center justify-center gap-2">
            <img
              src={panicImage}
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-3xl font-bold text-cyan-500">Portfolio</h1>
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
              className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
            >
              Log In
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="rounded-xl border border-zinc-300 bg-zinc-100 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white hover:shadow-sm"
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
