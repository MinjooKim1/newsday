let newsList = [];
let inputArea = document.getElementById("input-area");
//main menu
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
//side menu
const sideMenu = document.querySelectorAll(".side-menu-list button");
sideMenu.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let totalResults = 0;
let page = 1;
let totalPage = 0;
const PAGE_SIZE = 10;
const groupSize = 5;

const mainPage = async () => {
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  await getNews();
};
const getNews = async () => {
  try {
    url.searchParams.set("page", page); //=> &page=page
    url.searchParams.set("pageSize", PAGE_SIZE);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result found");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      totalPage = Math.ceil(data.totalResults / PAGE_SIZE);
      console.log("data", newsList);
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
    newsList = data.articles;
    render();
  } catch (error) {
    errorRender(error.message);
    paginationRender();
  }
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

//side menu open & close
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
  console.log("cate", category);
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`
  );
  await getNews();
};

//find news by search
const searchByKeyword = async () => {
  const keyword = document.getElementById("searchInput").value;

  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`
  );
  await getNews();
};

// enter key for search function
inputArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchByKeyword();
  }
});

//visualization UI
const render = () => {
  let newsHTML = newsList
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

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
  console.log("eee", errorHTML);
};

const paginationRender = () => {
  //totalResult,
  //page
  //pagesize
  //totalPage
  //groupSize
  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  const lastPage = pageGroup * groupSize;
  //last page < 5 ? lastpage = totalPage
  if (lastPage > totalPage) {
    lastPage = totalPage;
  }

  //firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  let paginationHTML = ``;
  let last = pageGroup * 5;
  if (last > totalPage) {
    last = totalPage;
  }
  let first = last - 4 <= 0 ? 1 : last - 4;

  if (page > 1) {
    paginationHTML = `
  <li class="page-item " onclick="moveToPage(1)">
      <span class="page-link">&lt&lt</span>
    </li>
  <li class="page-item " onclick="moveToPage(${page - 1})">
      <span class="page-link">&lt</span>
    </li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `
    <li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
  }

  if (page < totalPage) {
    paginationHTML += `
  <li class="page-item" onclick="moveToPage(${
    page + 1
  })"><a class="page-link" href="#">&gt;</a></li><li class="page-item" onclick="moveToPage(${totalPage})"><a class="page-link" href="#">&gt;&gt;</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};
const moveToPage = async (pageNum) => {
  page = pageNum;
  await getNews();
};

getLatestNews();
