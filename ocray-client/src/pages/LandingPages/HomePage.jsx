import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="mx-auto max-w-6xl text-zinc-900">
      <div className="grid gap-8 border-b border-black py-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5">
          <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-600">Hero Section</p>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            John Carlo Ocray
            <br />
            Network Engineer & Web Developer
          </h1>
          <p className="max-w-xl text-sm leading-7 text-zinc-700">
            Technical article space focused on modern web development, network architecture, and
            production-ready systems.
          </p>
          <Link
            to="/articles"
            className="inline-flex rounded-full border border-black bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-zinc-100"
          >
            Learn More
          </Link>
        </div>

        <div className="rounded-3xl border border-black p-3">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80"
            alt="Server and network infrastructure"
            className="h-full min-h-60 w-full rounded-2xl border border-black object-cover"
          />
        </div>
      </div>

      <div className="border-b border-black py-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-600">KPI Section</p>
        <h2 className="mt-4 text-2xl font-semibold text-black">Quick Overview Blocks</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['12', 'Projects'],
            ['08', 'Sections'],
            ['24', 'Screens'],
            ['04', 'Layouts'],
          ].map(([value, label]) => (
            <article key={label} className="rounded-2xl border border-black bg-white p-4">
              <p className="text-2xl font-black text-black">{value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-zinc-600">{label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
