const loadNews = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => {
      throw error;
    });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categoriesContainer");
  categories.forEach((category) => {
    const span = document.createElement("span");
    span.innerHTML = `
          <span onclick="categoriesContent(${category.category_id})">${category.category_name}</span>
          `;
    categoriesContainer.appendChild(span);
  });
};

const categoriesContent = (id) => {
  //   start spinners
  toggleSpinner(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${
    "0" + id
  }`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoriesContent(data.data))
    .catch((error) => {
      throw error;
    });
};

const displayCategoriesContent = (data) => {
  // sort by views
  data.sort(function (a, b) {
    return b.total_view - a.total_view;
  });
  let allNews = document.getElementById("allNews");
  allNews.textContent = "";
  if (data.length > 0) {
    data.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("p-5");
      div.innerHTML = `
              <div class="card mb-3 p-5">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src="${
                        element.thumbnail_url
                      }" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h1 class="card-title">${element.title}</h1>
                          <p class="card-text">${
                            element.details.length > 350
                              ? element.details.slice(0, 200) + "..."
                              : element.details
                          }</p>
                          <div class='d-flex justify-content-between align-items-center'>
                          <div class='d-flex align-items-center'>
                              <span class='me-3'><img src="${
                                element.author.img
                              }" style='width:50px ;border-radius:50%' alt="" /></span>
                              <span> <h4>${
                                element.author.name
                                  ? element.author.name
                                  : "No Name"
                              }</h4></span>
                          </div>
                          <div>
                          <i class="fa-solid fa-eye me-1"></i>${
                            element.total_view
                              ? element.total_view
                              : "No Content"
                          }
                          </div>
                          <div>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star"></i>
                          </div>
                          <div onclick='showAllDetails("${
                            element._id
                          }")' data-bs-toggle="modal"
                          data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right" ></i></div>
              </button>
                          
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>
              `;

      document.getElementById("valuesOfCategory").innerText =
        data.length + " Items founds for Category";
      allNews.appendChild(div);
    });
  } else {
    let div = document.createElement("div");
    div.classList.add("p-5");
    div.innerHTML = `
              <div class="card mb-3 p-5" style="height:300px">
              <h1 class='text-center'>No Content <br> Available for Categories</h1>
              </div>
              `;
    document.getElementById("valuesOfCategory").innerText =
      data.length + " Items founds for Category";
    allNews.appendChild(div);
  }
  //   stop spinners
  toggleSpinner(false);
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

function showAllDetails(news_id) {
  let url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => disPlay(data.data))
    .catch((error) => {
      throw error;
    });
}
const disPlay = (data) => {
  data.forEach((news) => {
    const modalTitle = document.getElementById("newsDetailModalLabel");
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById("news-details");
    newsDetails.innerHTML = `
    <img src="${
      news.image_url
    }" class="card-img-top p-2 w-100 h-50 " alt="Not Found" />
    <p>Author: ${news.author.name ? news.author.name : "No data found"}</p>
    <p>Publish Date: ${
      news.author.published_date ? news.author.published_date : "No data found"
    }</p>
    <p>Total View: ${news.total_view}</p>
    `;
    console.log(modalTitle.innerText);
  });
};
categoriesContent(8);
loadNews();
