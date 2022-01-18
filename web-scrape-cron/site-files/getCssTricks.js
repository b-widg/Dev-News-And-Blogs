const { JSDOM } = require('jsdom');
const { getLocalTime } = require('../scrapeUtils');

module.exports.getCssTricks = async () => {
  const url = 'https://css-tricks.com/archives/';
  let articles = [];

  await JSDOM.fromURL(url).then((dom) => {
    const doc = dom.window.document;

    const sourceName = 'CSS-TRICKS';
    const sourceLink = 'https://css-tricks.com/';
    const sourceLogo = 'images/logos/csstricks.svg';
    const cards = doc.querySelectorAll('.article-card.article');

    cards.forEach((card) => {
      const imageLink = card.querySelector('img').getAttribute('src');
      const title = card.querySelector('h2 > a').textContent.trim();
      const articleLink = card.querySelector('h2 > a').getAttribute('href');

      let tagList = card.querySelectorAll('.tags > a');
      let tags = [];
      let tagLinks = [];
      tagList.forEach((tag) => {
        tags = [...tags, `#${tag.textContent}`];
        tagLinks = [...tagLinks, tag.getAttribute('href')];
      });

      let author = '';
      let authorLink = '';
      let authorImageLink = '';
      let whenPublished = '';
      if (card.querySelector('.author-name')) {
        author = card.querySelector('.author-name').textContent.trim();
        authorLink = card.querySelector('.author-name').getAttribute('href');
        authorImageLink = card
          .querySelector('div.author-row > a > img')
          .getAttribute('src');
        whenPublished = card.querySelector('time').textContent.trim();
      }
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
      // Skip cards w/o author info.  They're ads.
      if (author !== '') {
        articles = [...articles, cardContent];
      }
    });
  });

  return articles;
};
