const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { wait } = require('../scrapeUtils');
const { getLocalTime } = require('../scrapeUtils');

const getArticles = async () => {
  const url = 'https://snyk.io/blog/';
  let articles = [];

  await JSDOM.fromURL(url).then((dom) => {
    const doc = dom.window.document;

    const sourceName = 'snyc';
    const sourceLink = 'https://snyk.io/blog/';
    const sourceLogo = 'images/logos/snyk.svg';
    const posts = doc.querySelectorAll('.snyk-post');

    posts.forEach((post) => {
      const imageLink = post
        .querySelector('.wp-post-image')
        .getAttribute('src');
      const title = post.querySelector('h3 > a').textContent;
      const articleLink = post.querySelector('h3 > a').getAttribute('href');
      const tags = [
        `#${post.querySelector('.category-wrapper > a').textContent}`,
      ];
      const tagLinks = [
        post.querySelector('.category-wrapper > a').getAttribute('href'),
      ];

      // will need to scrape individual articles to get
      // author and pub date info
      const cardContent = {
        sourceName,
        sourceLink,
        sourceLogo,
        imageLink,
        title,
        articleLink,
        tags,
        tagLinks,
        // author,
        // authorLink,
        // authorImageLink,
        // whenPublished,
        // scrapeTimeStamp,
        // scrapeTimeLocal,
      };
      articles = [...articles, cardContent];
    });
  });
  return articles;
};

// get author info and publication date
const getAuthorPubDate = async (articleLink) => {
  let authorPubDate = {};

  await JSDOM.fromURL(articleLink).then((dom) => {
    const doc = dom.window.document;

    const author = doc.querySelector('.author').textContent.trim();
    const authorLink = ''; // not provideded.
    const authorImageLink = doc
      .querySelector('.author-image-wrapper > span > img')
      .getAttribute('src');
    const whenPublished = doc.querySelector('.date').textContent.trim();

    const scrapeTimeStamp = Date.now();
    const scrapeTimeLocal = getLocalTime(scrapeTimeStamp);

    authorPubDate = {
      author,
      authorLink,
      authorImageLink,
      whenPublished,
      scrapeTimeStamp,
      scrapeTimeLocal,
    };
  });
  return authorPubDate;
};

// module.exports.getSnyk = async () => {
const getSnyk = async () => {
  let articles = [];
  let completeArticle = {};
  const initialArticles = await getArticles();
  for await (const article of initialArticles) {
    const authorPubDate = await getAuthorPubDate(article.articleLink);
    completeArticle = { ...article, ...authorPubDate };
    console.log(
      'file: getSnyk.js | line 90 | completeArticle',
      completeArticle
    );
    articles = [...articles, completeArticle];
    await wait(1000);
  }
  return articles;
};

getSnyk();
