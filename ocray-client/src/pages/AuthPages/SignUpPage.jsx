import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-black bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-zinc-300';

const initialForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: 'male',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedUsername = useMemo(() => {
    const fromEmail = String(form.email || '').split('@')[0] || '';
    return fromEmail.toLowerCase().replace(/[^a-z0-9._-]/g, '');
  }, [form.email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!/^\d{11}$/.test(form.contactNumber.trim())) {
      setError('Contact number must be exactly 11 digits.');
      return;
    }

    if (!/^\d+$/.test(form.age.trim())) {
      setError('Age must contain numbers only.');
      return;
    }

    if (form.password.trim().length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      setLoading(true);
      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender.trim().toLowerCase(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        role: 'editor',
        username: (form.username.trim() || suggestedUsername).toLowerCase(),
        password: form.password,
        address: form.address.trim(),
        isActive: true,
      });

      setMessage('Account created successfully. You may now sign in.');
      setForm(initialForm);
      setTimeout(() => navigate('/auth/signin'), 900);
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-black bg-zinc-100">
      <div className="border-b border-black bg-zinc-100 px-7 py-6 text-black">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-600">New Profile</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Sign Up</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-700">
          Create your account and start reading technical write-ups and project updates.
        </p>
      </div>

      <form className="space-y-5 bg-zinc-100 px-7 py-7" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-zinc-800">First Name</label>
            <input id="first-name" name="firstName" type="text" className={inputClasses} value={form.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-800">Last Name</label>
            <input id="last-name" name="lastName" type="text" className={inputClasses} value={form.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-semibold text-zinc-800">Age</label>
            <input id="age" name="age" type="text" className={inputClasses} value={form.age} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm font-semibold text-zinc-800">Gender</label>
            <select id="gender" name="gender" className={inputClasses} value={form.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-number" className="text-sm font-semibold text-zinc-800">Contact Number</label>
          <input id="contact-number" name="contactNumber" type="text" className={inputClasses} value={form.contactNumber} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-800">Email</label>
          <input id="signup-email" name="email" type="email" className={inputClasses} value={form.email} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="signup-username" className="text-sm font-semibold text-zinc-800">Username</label>
          <input id="signup-username" name="username" type="text" className={inputClasses} value={form.username} onChange={handleChange} placeholder={suggestedUsername || 'username'} />
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-semibold text-zinc-800">Address</label>
          <input id="address" name="address" type="text" className={inputClasses} value={form.address} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-800">Password</label>
          <input id="signup-password" name="password" type="password" className={inputClasses} value={form.password} onChange={handleChange} required />
          <p className="mt-2 text-xs leading-5 text-zinc-600">Use at least 8 characters.</p>
        </div>

        {error ? <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p> : null}

        <button type="submit" disabled={loading} className="w-full rounded-xl border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-60">
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <div className="border-t border-black pt-6 text-center text-sm text-zinc-700">
          Already have an account? <Link to="/auth/signin" className="font-semibold text-black underline">Log In</Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
