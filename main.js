let newsList = [];

const getLatestNews = async () => {
  let url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log("rrr", newsList);
};
getLatestNews();
