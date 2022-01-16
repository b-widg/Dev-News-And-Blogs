const { getFreeCodeCamp } = require('./site-files/getFreeCodeCamp');
const { getCssTricks } = require('./site-files/getCssTricks');
const { getDevTo } = require('./site-files/getDevTo');
const { getMongoDb } = require('./site-files/getMongoDb');
const { getSnyk } = require('./site-files/getSnyk');
const { loadArticlesToMongoDb } = require('./loadArticlesToDb');

const runScrapes = async () => {
  console.log('runScrapes() called!');
  const freeCodeCampArticles = await getFreeCodeCamp();
  const cssTricksArticles = await getCssTricks();
  const devToArticles = await getDevTo();
  const mongoDbArticles = await getMongoDb();
  const snykArticles = await getSnyk();
  articles = [
    ...freeCodeCampArticles,
    ...cssTricksArticles,
    ...snykArticles,
    ...mongoDbArticles,
    ...devToArticles,
  ];

  loadArticlesToMongoDb(articles);
};

runScrapes();
