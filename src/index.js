const prompts = require('prompts');

const thisUrl = () => fetch("https://hn.algolia.com/api/v1/search")
    .then((response) => {
        response.json
        .then((news) => {news.json.json})
        }).then(console.log);

function print(){
    return console.log(thisUrl)
}


(async () => {
  const response = await prompts({
    type: 'number',
    name: 'news',
    message: 'How many news you'+'\''+'d like to see?'
  });

  //console.log(response.news);
})();