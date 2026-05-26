import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-zinc-200">
      <div className="pointer-events-none absolute -top-24 left-0 h-28 w-full origin-top-left -skew-y-3 bg-zinc-200" />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-zinc-700/70 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center border border-zinc-500 text-xl font-black tracking-wider text-white">
              RA
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Ocray</h2>
              <span className="hidden text-zinc-500 md:inline">/</span>
              <p className="hidden text-sm text-zinc-400 md:inline">Simply #1 React Learning Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            {['f', 'x', 'in', 'ig', 'yt'].map((social) => (
              <a
                key={social}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-600 text-xs font-semibold transition hover:border-orange-400 hover:text-orange-300"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="mt-5 grid grid-cols-2 gap-4 text-base text-zinc-300">
              <div className="space-y-3">
                <Link to="/" className="block transition hover:text-orange-300">Home</Link>
                <Link to="/about" className="block transition hover:text-orange-300">About</Link>
              </div>
              <div className="space-y-3">
                <Link to="/articles" className="block transition hover:text-orange-300">Articles</Link>
                <Link to="/auth/signin" className="block transition hover:text-orange-300">Contact</Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <div className="mt-5 space-y-4 text-zinc-300">
              <p>3015 Grand Ave, Coconut Grove, Merrick Way, FL 12345</p>
              <p>+123-456-789</p>
              <p>sales@example.com</p>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-xl font-semibold text-white">Remain Updated</h3>
            <div className="mt-5 max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full border border-zinc-200 bg-zinc-100 px-4 py-3 text-base text-zinc-900 outline-none ring-0 transition focus:border-orange-500"
              />
              <button
                type="button"
                className="mt-4 bg-orange-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-600"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-700/70 pt-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Ocray. All rights reserved.</p>
          <p>Designed by Ocray Themes</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

