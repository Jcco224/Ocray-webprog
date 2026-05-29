import defaultArticles from '../assets/articles';

const STORAGE_KEY = 'ocray-articles';

export const getArticles = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultArticles;
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultArticles;
  } catch {
    return defaultArticles;
  }
};

export const saveArticles = (articles) => {
  const next = Array.isArray(articles) ? articles : [];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const createArticle = (article) => {
  const current = getArticles();
  return saveArticles([...current, article]);
};

export const updateArticle = (name, payload) => {
  const current = getArticles();
  const updated = current.map((article) =>
    article.name === name ? { ...article, ...payload } : article
  );
  return saveArticles(updated);
};

export const deleteArticle = (name) => {
  const current = getArticles();
  const updated = current.filter((article) => article.name !== name);
  return saveArticles(updated);
};
