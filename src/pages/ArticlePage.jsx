import heroImage from '../assets/images/Panic.png';
import meImage from '../assets/images/Me.jpg';
import Button from '../components/Button';

const articles = [
  {
    label: 'Article 01',
    title: 'Designing with restraint in a modern interface',
    description:
      'A minimalist layout works best when spacing, type scale, and visual grouping are handled with intention instead of decoration.',
    image: heroImage,
    alt: 'Abstract workspace illustration for article card',
  },
  {
    label: 'Article 02',
    title: 'Why reusable components matter in React projects',
    description:
      'Shared building blocks reduce repetition, speed up enhancements, and help every page feel like part of one polished application.',
    image: meImage,
    alt: 'Portrait image representing component reusability article',
  },
  {
    label: 'Article 03',
    title: 'Using routing to create a clearer content journey',
    description:
      'A simple route structure gives each page a purpose and helps visitors move naturally from introduction to detail and supporting content.',
    image: heroImage,
    alt: 'Illustration representing route-based page flow',
  },
  {
    label: 'Article 04',
    title: 'Tailwind styling for fast and consistent UI refinement',
    description:
      'Utility classes make it easier to fine-tune borders, padding, alignment, and responsiveness while keeping the code easy to follow.',
    image: meImage,
    alt: 'Portrait image representing Tailwind interface refinement',
  },
];

const ArticlePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 py-8 md:py-12">
      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured reading in a clean card layout
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          This page presents content in a simple, consistent card system with
          images, concise write-ups, and enough whitespace to keep everything
          easy to scan.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-8 shadow-sm md:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Article card grid
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-zinc-50 shadow-sm"
            >
              <img
                src={article.image}
                alt={article.alt}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {article.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {article.description}
                </p>
                <Button className="mt-5">Read More</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
