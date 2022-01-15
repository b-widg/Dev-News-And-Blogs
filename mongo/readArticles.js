const { MongoClient } = require('mongodb');
// require('dotenv').config({ path: '../.env' });

const findAll = async (client) => {
  const cursor = await client
    .db('DevNews')
    .collection('current_articles')
    .find();
  const results = await cursor.toArray();
  return results;
};

module.exports.readArticles = async () => {
  // const readArticles = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    // preform database work here
    const articles = await findAll(client);
    return articles;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

// readArticles().catch(console.error);
