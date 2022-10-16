const thisUrl = () => fetch("https://hn.algolia.com/api/v1/search")
    .then((response) => {
        response.json
        .then((news) => {news.json.json})
        }).then(console.log);

function print(){
    return console.log(thisUrl)
}

console.log("yo");
