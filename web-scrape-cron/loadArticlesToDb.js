const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './.env' });

const dropArticles = async (client) => {
  await client.db('DevNews').collection('current_articles').drop();
};

const insertArticles = async (client, articles) => {
  const result = await client
    .db('DevNews')
    .collection('current_articles')
    .insertMany(articles);
};

module.exports.loadArticlesToMongoDb = async (articles) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    // preform database work here
    await dropArticles(client);
    await insertArticles(client, articles);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};
