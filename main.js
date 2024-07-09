const getLatestNews = async () => {
  const url = URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=`);
  const response = await fetch(url);
  const data = await response.json();
  let news = data.articles;
  console.log("rrr", news);
};
getLatestNews();
