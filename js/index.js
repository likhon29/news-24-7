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
  }

loadNews();