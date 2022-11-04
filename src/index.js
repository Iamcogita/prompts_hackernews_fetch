const prompts = require('prompts');
const newsArticle = require('./model.js');

const url1 = "https://hn.algolia.com/api/v1/search";

function APIfetcher(url){
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let news = [];
            json.hits.forEach(e => {
                news.push(new newsArticle(
                    e.title,
                    e.url, 
                    e.author, 
                    e.created_at
                 ))
            });
            return news;
        });
}

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'pageSize',
    message: 'How many news you'+'\''+'d like to see?'
  });
  let newsList = [];
  let algoliaPromise = APIfetcher(url1).then(a => newsList.push(...a));
  await algoliaPromise;
  console.log(newsList.slice(0, response.pageSize));
})();