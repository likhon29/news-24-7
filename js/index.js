const loadNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayCategories(data.data.news_category));
  };
  const displayCategories = (categories) => {
    console.log(categories);
    let categoriesContainer = document.getElementById("categoriesContainer");
    categories.forEach((category) => {
      const span = document.createElement("span");
      span.innerHTML = `
          <span onclick="categoriesContent(${category.category_id})">${category.category_name}</span>
          `;
      categoriesContainer.appendChild(span);
    });
  };
  
  const categoriesContent = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${
      "0" + id
    }`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayCategoriesContent(data.data));
  };
  
  const displayCategoriesContent = (data) => {
      let allNews = document.getElementById('allNews')
      allNews.textContent = ''
      if (data.length > 0) {
          data.forEach(element => {
              let div = document.createElement('div')
              div.classList.add('p-5')
              div.innerHTML = `
              <div class="card mb-3 p-5">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h1 class="card-title">${element.title}</h1>
                          <p class="card-text">${element.details.length > 350 ? element.details.slice(0, 200) + '...' : element.details}</p>
                          <div class='d-flex justify-content-between align-items-center'>
                          <div class='d-flex align-items-center'>
                              <span class='me-3'><img src="${element.author.img}" style='width:50px ;border-radius:50%' alt="" /></span>
                              <span> <h4>${element.author.name ? element.author.name : "No Name"}</h4></span>
                          </div>
                          <div>
                          <i class="fa-solid fa-eye me-1"></i>${element.total_view ? element.total_view : "No Content"}
                          </div>
                          <div>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star full"></i>
                          <i class="fa-solid fa-star"></i>
                          </div>
                          <div onclick='showAllDetails("${element._id}")' data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right" ></i></div>
              </button>
                          
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>
              `
           
              allNews.appendChild(div)
  
          })
      }
      else {
  
          let div = document.createElement('div')
          div.classList.add('p-5')
          div.innerHTML = `
              <div class="card mb-3 p-5">
              <h1 class='text-center'>No Content</h1>
              </div>
              `
       
          allNews.appendChild(div)
  
  
      }
  }
  
 

  loadNews();
  