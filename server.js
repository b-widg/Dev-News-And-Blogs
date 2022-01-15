require('dotenv').config({ path: './.env' });
const express = require('express');
const path = require('path');
// const { getCssTricks } = require('./utils/getCssTricks');
// const { getDevTo } = require('./utils/getDevTo');
// const { getFreeCodeCamp } = require('./utils/getFreeCodeCamp');
// const { getMongoDb } = require('./utils/getMongoDb');
// const { getSnyk } = require('./utils/getSnyk');
// const { loadArticlesToMongoDb } = require('./mongo/loadArticlesToDb');
const { readArticles } = require('./mongo/readArticles');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.static('public/images'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  //   const cssTricksArticles = await getCssTricks();
  //   const freeCodeCampArticles = await getFreeCodeCamp();
  //   const devToArticles = await getDevTo();
  //   const mongoDbArticles = await getMongoDb();
  //   const snykArticles = await getSnyk();
  //   articles = [
  //     ...freeCodeCampArticles,
  //     ...cssTricksArticles,
  //     ...snykArticles,
  //     ...mongoDbArticles,
  //     ...devToArticles,
  //   ];

  //   loadArticlesToMongoDb(articles);

  const articles = await readArticles();

  const tags = articles.map((article) => {
    return article.tags;
  });

  const flattenedTags = tags.flat();
  const uniqueTags = [...new Set(flattenedTags)];
  uniqueTags.sort();

  const sources = articles.map((article) => {
    return article.sourceName;
  });
  const uniqueSources = [...new Set(sources)];
  uniqueSources.sort();

  res.render('index', {
    articles,
    uniqueTags,
    uniqueSources,
  });
});

app.listen(PORT, () => {
  console.log(`-----------------------------------
Listening on http://localhost:${PORT}
-----------------------------------`);
});
