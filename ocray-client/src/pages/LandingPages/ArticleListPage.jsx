import ArticleList from '../../components/ArticleList';
import { getArticles } from '../../services/articleService';

function ArticleListPage() {
  const articles = getArticles();

  return (
    <main className="mx-auto max-w-6xl py-12 text-zinc-900">
      <p className="text-[10px] uppercase tracking-[0.32em] text-zinc-600">Feature Cards</p>
      <h1 className="mt-3 text-4xl font-black text-black">Simple Wireframe Cards</h1>
      <div className="mt-8">
        <ArticleList articles={articles} />
      </div>
    </main>
  );
}

export default ArticleListPage;
