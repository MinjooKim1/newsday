const getLatestNews = async () => {
  let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/`);

  const response = await fetch(url);
  const data = await response.json();
  let news = data.articles;
  console.log("rrr", news);
};
getLatestNews();
