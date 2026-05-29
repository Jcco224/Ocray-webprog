import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'border-black bg-black text-white shadow-sm hover:bg-zinc-800',
  secondary:
    'border-black bg-white text-zinc-900 hover:bg-zinc-100',
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
