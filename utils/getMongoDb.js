const { JSDOM } = require('jsdom');

module.exports.getMongoDb = async (url) => {
  let articles = [];

  const baseUrl = 'https://www.mongodb.com/developer';

  const categories = ['/learn/'];

  for await (const category of categories) {
    const url = baseUrl + category;

    await JSDOM.fromURL(url).then((dom) => {
      const doc = dom.window.document;

      // Getting the total cards on these pages returns a lot of elements
      // without the content needed so we're searching articles with images
      // and then grabbing a list of their parent cards.
      const articleImages = doc.querySelectorAll(
        `[data-test='card'] > div > div > img`
      );

      articleImages.forEach((article) => {
        let tags = [];
        let tagLinks = [];

        // anchor element containing cards
        let card = article.parentElement.parentElement.parentElement;

        const imageLink = card.querySelector(`img`).getAttribute('src');
        const title = card.querySelector(`h5`).textContent;
        const articleLink = `https://www.mongodb.com${card.getAttribute(
          'href'
        )}`;
        const tagAnchors = card.nextSibling.querySelectorAll('li > a');

        tagAnchors.forEach((tagAnchor) => {
          let tag = tagAnchor.textContent;
          let tagLink = tagAnchor.getAttribute('href');
          if (
            tag == null ||
            tag == undefined ||
            tag == '...' ||
            tag.length > 15
          ) {
            tag = '';
            tagLink = '';
          }
          if (tag != '') {
            tags = [...tags, `#${tag}`];
            tagLinks = [...tagLinks, `https://mongodb.com${tagLink}`];
          }
        });

        const cardContent = {
          sourceName: 'MongoDB',
          sourceLink: 'https://www.mongodb.com/developer/learn',
          sourceLogo: 'images/logos/mongodb.svg',
          imageLink,
          title,
          articleLink,
          tags, // array
          tagLinks, // array
          author: '',
          authorLink: '',
          authorImageLink: '',
          whenPublished: '',
          scrapeTimeStamp: Date.now(),
        };

        articles = [...articles, cardContent];
      });
    });
  }
  return articles;
};
