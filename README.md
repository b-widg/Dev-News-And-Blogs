# Dev News and Blogs
This project was created to use as a personal homepage so I don't need to search for my favorite dev blogs.  You can use the hamburger menu on the left to filter by the web sites the articles come from or by their hashtags.

## [https://dev-news-and-blogs.herokuapp.com/](https://dev-news-and-blogs.herokuapp.com/)
![Screenshot](./public/images/DevNewsScreenShot.png)

A Heroku Scheduler is used to run a scrape of a handful of sites once an hour and saves the article data to a MongoDb database.  The website pills from whatever is currently in the Mongo database.
## Dependencies
- [axios](https://www.npmjs.com/package/axios) <img src="https://axios-http.com//assets/favicon.ico" alt="axios logo" width=15>
- [dotenv](https://www.npmjs.com/package/dotenv) <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv logo" width=16>
- [express](https://www.npmjs.com/package/express) <img src="https://expressjs.com/images/favicon.png" alt="express logo" width=16 border-radius=50%>
- [jsdom](https://www.npmjs.com/package/jsdom) <img src="https://raw.githubusercontent.com/jsdom/jsdom/HEAD/logo.svg" alt="jsdom logo" width=18>
- [mongoDb](https://www.npmjs.com/package/mongodb) <img src="https://www.mongodb.com/developer/favicon.ico" alt="mongodb logo" width=18>
- [pug](https://www.npmjs.com/package/pug) <img src="https://camo.githubusercontent.com/2eb688a747805c9acd144faf728c8a30f86fc4ca5fb39e6528232f0372151364/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f656563343336636565386664396431373236643738333963626539396431663639343639326330632f5356472f7075672d66696e616c2d6c6f676f2d5f2d636f6c6f75722d3132382e737667" alt="pug logo" width=23>
- [nodemon](https://www.npmjs.com/package/nodemon) <img src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" alt="nodemon logo" width=15>

## To Do
- Add functionality to settings menu.
- Add ability to log in, share, favorite, and bookmark articles.
- Add error handling and testing to web scraper.
- clean/refactor CSS
