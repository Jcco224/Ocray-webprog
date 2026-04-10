import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'border-cyan-400 bg-cyan-400 text-white shadow-sm hover:border-cyan-500 hover:bg-cyan-500',
  secondary:
    'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition duration-200',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
