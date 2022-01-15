const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// to load next 25 articles use url plus page/page_number https://www.freecodecamp.org/news/page/2/ , https://www.freecodecamp.org/news/page/3/ , etc.

module.exports.getFreeCodeCamp = async () => {
  let url = 'https://www.freecodecamp.org/news/';
  let articles = [];

  await JSDOM.fromURL(url).then((dom) => {
    const doc = dom.window.document;

    const sourceName = 'freeCodeCamp';
    const sourceLink = 'https://www.freecodecamp.org/news/';
    const sourceLogo = 'images/logos/freecodecamp.svg';
    // articleCards is only used to get an array of the appropriate length to
    // loop through.  The index of each child element selected should always match
    // the index of articleCards when using querySelectoeAll as they should always
    // occur the same number of times and in the same order.
    const articleCards = doc.querySelectorAll('.post-card');

    articleCards.forEach((card, i) => {
      const imageLink =
        'http://www.freecodecamp.org' +
        doc.querySelectorAll('img.post-card-image')[i].getAttribute('data-src');
      const title = doc
        .querySelectorAll('.post-card-title > a')
        [i].textContent.trim();
      const articleLink = doc.querySelectorAll('.post-card-title > a')[i].href;
      // freeCodeCamp only has a single tag per article, but other sites have
      // multiple tagss.  Saving tagss and tagLinks as arrays to have
      // consistent data types.
      const tags = [
        doc.querySelectorAll('.post-card-tags > a')[i].textContent.trim(),
      ];
      const tagLinks = [doc.querySelectorAll('.post-card-tags > a')[i].href];
      const author = doc
        .querySelectorAll('.author-name-tooltip')
        [i].textContent.trim();
      const authorLink = doc.querySelectorAll('.author-list-item > a')[i].href;
      const authorImageLink = doc.querySelectorAll('.author-profile-image')[i]
        .src;
      const whenPublished =
        doc.querySelectorAll('time.meta-item')[i].textContent;
      const scrapeTimeStamp = Date.now();

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
      };
      articles = [...articles, cardContent];
    });
  });
  // console.log(articles);
  return articles;
};
