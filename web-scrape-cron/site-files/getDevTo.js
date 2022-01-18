const axios = require('axios');
const { JSDOM } = require('jsdom');
const { wait } = require('../scrapeUtils');
const { getLocalTime } = require('../scrapeUtils');

const formatTags = (tags) => {
  return tags.map((tag) => `#${tag}`);
};

const getCategoryLinks = (tags) => {
  const catagoryLinks = tags.map((tag) => {
    return `https://dev.to/t/${tag}`;
  });
  return catagoryLinks;
};

const createArticles = async (responses) => {
  let articles = [];

  responses.forEach((response) => {
    const scrapeTimeStamp = Date.now();
    const scrapeTimeLocal = getLocalTime(scrapeTimeStamp);
    const whenPublished = getLocalTime(response.published_at_int);
    const cardContent = {
      sourceName: 'Dev.to',
      sourceLink: 'https://dev.to/',
      sourceLogo: 'images/logos/devto.svg',
      imageLink: '',
      title: response.title,
      articleLink: `https://dev.to${response.path}`,
      tags: formatTags(response.tag_list), // array
      tagLinks: getCategoryLinks(response.tag_list), // array
      author: response.user.name,
      authorLink: `https://dev.to/${response.user.name}`,
      authorImageLink: response.user.profile_image_90,
      whenPublished,
      scrapeTimeStamp,
      scrapeTimeLocal,
    };
    articles = [...articles, cardContent];
  });

  // Follow the link to each article to get an image from the actial article
  // and
  let index = 0;
  for await (const article of articles) {
    const url = article.articleLink;

    await JSDOM.fromURL(url).then((dom) => {
      const doc = dom.window.document;
      const imageLink = doc.querySelector('.crayons-article__cover__image');
      // Not all articles have an image.  Need to verify image exists beore
      // attempting to use getAttribute('src').  It will cause an error
      // if imageLink is null
      imageLink
        ? (articles[index].imageLink = imageLink.getAttribute('src'))
        : (articles[index].imageLink = 'images/logos/devtoArticle.svg');

      const authorLink =
        'https://dev.to' +
        doc.querySelector('.crayons-link.fw-bold').getAttribute('href');
      articles[index].authorLink = authorLink;
      index += 1;
    });
    await wait(1000);
  }
  return articles;
};

module.exports.getDevTo = async () => {
  // returns json file with details for 10 articles
  try {
    const response = await axios.get('https://dev.to/search/feed_content', {
      params: {
        per_page: 10,
        page: 0,
        sort_by: 'hotness_score',
        sort_direction: 'desc',
        class_name: 'Article',
      },
    });
    const articles = await createArticles(response.data.result);

    return articles;
  } catch (error) {
    console.log(error);
  }
};

// Example result result from json file:
//result: [
//  {
//    class_name: "Article",
//    cloudinary_video_url: null,
//    comments_count: 25,
//    id: 938030,
//    path: "/nickytonline/frontend-developer-resources-2022-4cp2",
//    public_reactions_count: 1236,
//    readable_publish_date: "Dec 28",
//    reading_time: 7,
//    title: "Frontend Developer Resources 2022",
//    user_id: 9597,
//    video_duration_string: "00:00",
//    published_at_int: 1640665007,
//    tag_list: [
//      "javascript",
//      "html",
//      "css",
//      "typescript"
//    ],
//    flare_tag: null,
//    user: {
//      name: "Nick Taylor",
//      profile_image_90: "https://res.cloudinary.com/practicaldev/image/fetch/s--XE2mPGud--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/9597/68d6245f-3152-4ed2-a245-d015fca4160b.jpeg",
//      username: "nickytonline"
//    }
//  },
//]
