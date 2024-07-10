let newsList = [];
let inputArea = document.getElementById("input-area");

const getLatestNews = async () => {
  let url = new URL(
    `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("rrr", newsList);
};
getLatestNews();

const openNav = () => {
  document.getElementById("side-menu").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("side-menu").style.width = "0";
};

const searchBox = () => {
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) =>
        `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
                src="${news.urlToImage}" 
                onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';" />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description.substr(0, 50) + "..."}</p>
          </div>
          <div> ${news.source.name} * ${(news.publishedAt = moment()
          .startOf("day")
          .fromNow())} </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};
