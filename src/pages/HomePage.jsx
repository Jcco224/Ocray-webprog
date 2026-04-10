import heroImage from '../assets/images/Panic.png';
import introImage from '../assets/images/intro.jpg';
import meImage from '../assets/images/Me.jpg';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const statItems = [
  { value: '12+', label: 'Projects' },
  { value: '08', label: 'Sections' },
  { value: '24', label: 'Screens' },
  { value: '04', label: 'Layouts' },
];

const featureCards = [
  {
    title: 'Feature Card One',
    copy: 'A simple highlight area for a project, service, or featured work.',
  },
  {
    title: 'Feature Card Two',
    copy: 'Soft spacing and restrained typography keep the page easy to scan.',
  },
  {
    title: 'Feature Card Three',
    copy: 'The overall layout stays calm, bright, and intentionally minimal.',
  },
];

const actionClasses =
  'inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition duration-200';

const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 py-8 md:gap-16 md:py-10">
      <section className="grid min-h-[68vh] gap-12 border-b border-zinc-100 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-400">
            Hello
          </p>
          <h1 className="mt-6 text-5xl font-bold uppercase leading-[0.95] text-cyan-400 md:text-7xl xl:text-[6.5rem]">
            I&apos;m Jc
            <br />
            A
            <br />
            Programmer
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-500 md:text-lg">
            Discover a cleaner portfolio-style homepage with a strong hero, calm
            spacing, and a polished layout system for profile content and
            featured sections.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/about" variant="primary">
              See more about Me!
            </Button>
            <Button to="/articles" variant="secondary">
              Portfolio
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full border-[12px] border-cyan-100 bg-white shadow-[0_0_0_12px_rgba(240,249,255,1)] md:h-[440px] md:w-[440px] xl:h-[520px] xl:w-[520px]">
            <div className="h-full w-full overflow-hidden rounded-full border-[10px] border-white bg-zinc-100">
              <img
                src={meImage}
                alt="Project author portrait"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-px overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-200 md:grid-cols-2 xl:grid-cols-4">
        {statItems.map((item) => (
          <article key={item.label} className="bg-white px-6 py-8">
            <p className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-zinc-500">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="py-4">
        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 px-6 py-8 md:px-8 md:py-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500">
              Selected Work
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-3xl">
              Minimal feature cards
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-zinc-200 bg-white p-5"
              >
                <div className="flex aspect-[4/3] items-end rounded-[1.25rem] bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f5_100%)] p-4">
                  <span className="inline-flex rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-500">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-zinc-950">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {card.copy}
                </p>
                <Link
                  to="/about"
                  className="mt-6 inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition duration-200 hover:border-zinc-400 hover:bg-zinc-50"
                >
                  View More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Website Introduction
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              What this project is designed to show
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50">
            <img
              src={introImage}
              alt="Website introduction visual"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-base leading-8 text-zinc-600">
              The project acts as a compact front-end showcase where each page
              has a specific role. The homepage sets the tone, the about page
              explains the technical intent, and the articles page presents
              content in a reusable card pattern.
            </p>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Instead of relying on heavy visual effects, the interface focuses
              on whitespace, typography, subtle borders, and carefully grouped
              sections. That approach keeps the experience elegant while still
              demonstrating practical React and Tailwind skills.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50 shadow-sm">
            <img
              src={heroImage}
              alt="Supporting visual for the homepage"
              className="h-full min-h-[260px] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Project Focus
            </p>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              FOCUS OF PROJECT
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
