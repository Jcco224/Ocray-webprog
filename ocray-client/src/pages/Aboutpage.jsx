import heroImage from '../assets/images/Panic.png';
import meImage from '../assets/images/Me.jpg';
import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-8 md:py-12">
      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50">
            <img
              src={heroImage}
              alt="Workspace illustration for the About page"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Page
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A clearer look at the project purpose, structure, and front-end
              decisions behind the site.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              This project was built to demonstrate how React can organize a
              multi-page interface while keeping the code maintainable and easy
              to extend. Each page is presented inside a shared layout so the
              navigation and overall visual system stay consistent.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              The enhancement keeps the layout minimal and white-themed while
              using Tailwind utility classes to refine spacing, borders,
              typography, and responsive behavior in a clean way.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Purpose
          </p>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            The website presents a straightforward front-end project where each
            page communicates one part of the overall experience: introduction,
            explanation, and content display.
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Reusability
          </p>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Shared components such as the navigation, layout wrapper, and button
            make updates easier and keep the design language consistent across
            pages.
          </p>
        </article>
        <article className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Styling
          </p>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Tailwind supports a fast styling workflow here by letting each page
            apply spacing, borders, and responsive layout adjustments directly in
            the component markup.
          </p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Expanded Write-Up
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            How the project applies React routing and reusable components
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-4 text-sm leading-7 text-zinc-600 sm:text-base">
            <p>
              React Router gives the website a clear structure by separating the
              Home, About, and Articles views into dedicated routes. That keeps
              the app simple to navigate and makes each page easier to maintain
              as the project grows.
            </p>
            <p>
              Reusability is also an important part of the project. The layout
              component handles the shared shell, the navigation bar presents a
              common entry point for every page, and the button component helps
              maintain a consistent call-to-action style.
            </p>
            <p>
              Tailwind CSS supports these goals by allowing precise control over
              spacing, borders, radius, typography, and responsive alignment
              without introducing unnecessary complexity. The result is a clean,
              readable interface that stays focused on content.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50">
            <img
              src={meImage}
              alt="Portrait used as supporting visual on the About page"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
