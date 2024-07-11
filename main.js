const API_KEY = `b0bd854324ca4848b08169ada4709bc1`;
let newsList = [];
let inputArea = document.getElementById("input-area");
const menus = document.querySelectorAll(".menus button");
console.log(menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(`https://m-newstime.netlify.app/top-headlines?country=us`);

const getNews = async () => {
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const getLatestNews = async () => {
  let url = new URL(`https://m-newstime.netlify.app/top-headlines?country=us`);
  getNews;
  console.log(newsList);
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

const searchNews = () => {
  const keyword = document.getElementById("searchInput").value;
  url = new URL(
    `https://m-newstime.netlify.app/top-headlines?country=us&q=${keyword}`
  );
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://m-newstime.netlify.app/top-headlines?country=us&category=${category}`
  );
  getNews;
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
            <p>${
              news.description == ""
                ? "no description"
                : news.description || news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            } 
            </p>
            <div class=source> ${news.source.name}  ${(news.publishedAt =
          moment().startOf("day").fromNow())} </div>
          </div>
          
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};
