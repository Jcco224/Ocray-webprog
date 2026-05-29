import { Link, useParams } from 'react-router-dom';
import articles from '../../assets/articles';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((item) => item.name === name);

  if (!article) {
    return (
      <section className="mx-auto max-w-4xl rounded-2xl border border-black bg-white p-8 text-zinc-900">
        <h1 className="text-3xl font-black">Article Not Found</h1>
        <Link to="/articles" className="mt-4 inline-block text-black underline">
          Return to Articles
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl py-10 text-zinc-900">
      <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-600">Article Detail</p>
      <h1 className="mt-3 text-4xl font-black text-black">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="mt-7 h-72 w-full rounded-3xl border border-black object-cover"
      />
      <div className="mt-8 space-y-5 rounded-3xl border border-black bg-white p-7 text-sm leading-7 text-zinc-800">
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link
        to="/articles"
        className="mt-7 inline-flex rounded-full border border-black px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-zinc-100"
      >
        Back to Articles
      </Link>
    </article>
  );
}

export default ArticlePage;
