const getPublishedArticles = (response) =>
  response.filter((article) => article.status === "published");

const toArticleSummary = (article) => ({
  id: article.id,
  title: article.title,
  authorName: article.author.name,
  views: article.views
});

const normalizeArticles = (response) =>
  getPublishedArticles(response).map((article) => toArticleSummary(article));