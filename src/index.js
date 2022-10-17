const prompts = require('prompts');

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

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'pageSize',
    message: 'How many news you'+'\''+'d like to see?'
  });
  let newsList = [];
  let algoliaPromise = getAlgolia(apiUrl).then( a => newsList.push(...a));

  await algoliaPromise;
  console.log(newsList.slice(0, response.pageSize));

})();