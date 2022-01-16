const { getFreeCodeCamp } = require('./site-files/getFreeCodeCamp');
const { getCssTricks } = require('./site-files/getCssTricks');
const { getMongoDb } = require('./site-files/getMongoDb');
const { getSnyk } = require('./site-files/getSnyk');
const { getDevTo } = require('./site-files/getDevTo');
const { loadArticlesToMongoDb } = require('./loadArticlesToDb');

const runScrapes = async () => {
  const freeCodeCampArticles = await getFreeCodeCamp();
  const cssTricksArticles = await getCssTricks();
  const mongoDbArticles = await getMongoDb();
  const snykArticles = await getSnyk();
  const devToArticles = await getDevTo();
  articles = [
    ...freeCodeCampArticles,
    ...cssTricksArticles,
    ...mongoDbArticles,
    ...snykArticles,
    ...devToArticles,
  ];

  loadArticlesToMongoDb(articles);
};

runScrapes();
