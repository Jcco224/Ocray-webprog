import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition duration-200',
    isActive
      ? 'bg-neutral-950 text-white'
      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
  ].join(' ');

const NavBarMinimal = () => {
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
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBarMinimal;
