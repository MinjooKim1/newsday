const getLatestNews = async () => {
  let url = new URL(
    `https://serene-cheesecake-72297b.netlify.app/top-headlines`
  );

  const response = await fetch(url);
  const data = await response.json();
  let news = data.articles;
  console.log("rrr", news);
};
getLatestNews();
