let newsList = [];
let inputArea = document.getElementById("input-area");
const menus = document.querySelectorAll(".menus button");
console.log(menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getNews = async () => {
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log(data);
  render();
};
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
);

//start interface road
const getLatestNews = () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  getNews();
};
getLatestNews();

//side menu
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

// search function
const searchNews = async () => {
  const keyword = document.getElementById("searchInput").value;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr?q=${keyword}`
  );
  await getNews();
};

//find news by categories
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  await getNews();
};

//find news by search
const searchByKeyword = () => {
  const keyword = document.getElementById("searchInput").value;

  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  getNews();
};

inputArea.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchByKeyword();
  }
});

//visualization UI
const render = () => {
  let newsHTML;
  if (newsList.length === 0) {
    newsHTML = '<p class="no-results"> no results found.</p>';
  } else {
    newsHTML = newsList
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
            <h4>${news.title}</h4>
             <p>${
               news.description == null || news.description == ""
                 ? "내용없음"
                 : news.description.length > 200
                 ? news.description.substring(0, 200) + "..."
                 : news.description
             }</p>
            <div class=source> ${news.source.name}  ${(news.publishedAt =
            moment().startOf("day").fromNow())} </div>
          </div>
        </div>`
      )
      .join("");
  }

  document.getElementById("news-board").innerHTML = newsHTML;
};
