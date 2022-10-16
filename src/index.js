const prompts = require('prompts');
//import {newsArticle} from './model.js'

class newsArticle {
    title;
    src;
    url;
    author;
    date;
    constructor(title, src, url, author, date) {
      this.title = title;
      this.src = src;
      this.url = url;
      this.author = author;
      this.date = date;
    }
};

// função getFirstArticle que retorna uma Promise para os detalhes da primeira notícia
const apiUrl = "https://hn.algolia.com/api/v1/search";
function getAlgolia(url){
    return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            let news = [];
            json.hits.forEach(e => {
                news.push(new newsArticle(
                    e.title, 
                    'algolia',
                    e.url, 
                    e.author, 
                    e.created_at
                 ))
            });
            return news;
        });
}
// getFirstArticle(apiUrl).then(console.log);

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'pageSize',
    message: 'How many news you'+'\''+'d like to see?'
  });
  let newsList = [];
  let algoliaPromise = getAlgolia(apiUrl).then( v => newsList.push(...v));

  await algoliaPromise;
  let pageNumber = 1; 
  let startIndex = response.pageSize * (pageNumber -1);
  console.log(newsList.slice(startIndex, startIndex + response.pageSize));

})();