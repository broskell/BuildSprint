function getPublishedArticles(response) {
  return response.filter(article => article.status === "published");
}

function toArticleSummary(article) {
  return {
    id: article.id,
    title: article.title,
    authorName: article.author.name,
    views: article.views
  };
}

function normalizeArticles(response) {
  return getPublishedArticles(response).map(toArticleSummary);
}