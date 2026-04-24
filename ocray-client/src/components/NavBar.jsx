import { NavLink } from 'react-router-dom';
import panicImage from '../assets/images/Panic.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'border-b px-2 py-2 text-sm font-medium transition duration-200',
    isActive
      ? 'border-zinc-400 text-zinc-900'
      : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
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

        <nav className="flex w-fit flex-wrap items-center gap-8">
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

export default NavBar;
