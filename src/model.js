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
}

module.exports = newsArticle;