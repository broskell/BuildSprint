const getPublishedArticles = (response) => {
  return response.data.filter((article) => article.status === "published");
};

const toArticleSummary = (article) => ({
  id: article.id,
  title: article.title,
  authorName: article.author.name,
  views: article.stats.views
});

const normalizeArticles = (response) => {
  return getPublishedArticles(response).map(toArticleSummary);
};