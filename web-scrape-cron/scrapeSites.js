const { getFreeCodeCamp } = require('./site-files/getFreeCodeCamp');
const { getCssTricks } = require('./site-files/getCssTricks');
const { getMongoDb } = require('./site-files/getMongoDb');
const { getSnyk } = require('./site-files/getSnyk');
const { getDevTo } = require('./site-files/getDevTo');
const { loadArticlesToMongoDb } = require('./loadArticlesToDb');

const runScrapes = async () => {
  const articles = await Promise.all([
    getFreeCodeCamp(),
    getCssTricks(),
    getMongoDb(),
    getSnyk(),
    getDevTo(),
  ]);
  loadArticlesToMongoDb(articles.flat());
};

runScrapes();
