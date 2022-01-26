const { JSDOM } = require('jsdom');
const { getLocalTime } = require('../scrapeUtils');

// to load next 25 articles use url plus page/page_number
// https://www.freecodecamp.org/news/page/2/ ,
// https://www.freecodecamp.org/news/page/3/ , etc.

module.exports.getFreeCodeCamp = async () => {
  let url = 'https://www.freecodecamp.org/news/';
  let articles = [];

  await JSDOM.fromURL(url).then((dom) => {
    const doc = dom.window.document;

    const sourceName = 'freeCodeCamp';
    const sourceLink = 'https://www.freecodecamp.org/news/';
    const sourceLogo = 'images/logos/freecodecamp.svg';

    const articleCards = doc.querySelectorAll('.post-card');

    articleCards.forEach((card, i) => {
      const imageLink = card.querySelector('img').getAttribute('src');
      const title = card
        .querySelector('.post-card-title > a')
        .textContent.trim();
      const articleLink = card.querySelector('.post-card-title > a').href;
      // freeCodeCamp only has a single tag per article, but other sites have
      // multiple tags.  Saving tagss and tagLinks as arrays to have
      // consistent data types.
      const tags = [
        card.querySelector('.post-card-tags > a').textContent.trim(),
      ];
      const tagLinks = [card.querySelector('.post-card-tags > a').href];
      const author = doc
        .querySelector('.author-name-tooltip')
        .textContent.trim();
      const authorLink = card.querySelector('.author-list-item > a').href;
      const authorImageLink = card.querySelector('.author-profile-image').src;
      const whenPublished = card.querySelector('time.meta-item').textContent;

      const scrapeTimeStamp = Date.now();
      const scrapeTimeLocal = getLocalTime(scrapeTimeStamp);

      const cardContent = {
        sourceName,
        sourceLink,
        sourceLogo,
        imageLink,
        title,
        articleLink,
        tags,
        tagLinks,
        author,
        authorLink,
        authorImageLink,
        whenPublished,
        scrapeTimeStamp,
        scrapeTimeLocal,
      };
      articles = [...articles, cardContent];
    });
  });
  return articles;
};

// (async () => console.log(await getFreeCodeCamp()))();
