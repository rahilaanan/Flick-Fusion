const buttonContainer = document.getElementById("button");
const cardContainer = document.getElementById("card-container");
const error = document.getElementById("error-element");
const sortBtn = document.getElementById("sort-btn");

let selectedCategory = 1000;

// for sorting by category
let sortByView = false;


const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const info = data.data;
  info.forEach((info) => {
    //console.log(info)

    const newBtn = document.createElement("button");
    newBtn.className = "btn bg-gray-300 category-btn";
    newBtn.innerText = info.category;
    newBtn.addEventListener("click", () => {
      fetchDataByCategories(info.category_id);
      const allBtn = document.querySelectorAll(".category-btn");
      for (const btn of allBtn) {
        btn.classList.remove("!bg-red-600");
      }
      newBtn.classList.add("!bg-red-600", "text-white");
    });
    buttonContainer.appendChild(newBtn);
  });

  function fetchDataByCategories(categoryID, sortByView) {
    selectedCategory = categoryID;

    const loadCardData = async (id) => {
      const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
      );
      const data = await res.json();
      const info = data.data;
      //for sorting
      sortBtn.addEventListener("click", () => {
        sortByView = true;
        fetchDataByCategories(selectedCategory, sortByView);
      });
      if (sortByView) {
        info.sort((a, b) => {
          const sortFirst = a.others?.views;
          //console.log(sortFirst)
          const sortSecond = b.others?.views;
          const sortFirstNumber = parseFloat(sortFirst.replace("K", "")) || 0;
          const sortSecondNumber =
            parseFloat(sortSecond.replace("K", "")) || 0;
          return sortSecondNumber - sortFirstNumber;
        });
      }
      //adding CSS to buttons

      if (info.length === 0) {
        error.classList.remove("hidden");
      } else {
        error.classList.add("hidden");
      }
      cardContainer.innerHTML = "";
      info.forEach((cards) => {
        let verified = "";
        if (cards.authors[0].verified) {
          verified = `<img src="https://cdn-icons-png.flaticon.com/128/4847/4847039.png" loading="lazy" alt="Approved " title="Approved " width="24" height="24">`;
        }

        const newCard = document.createElement("div");
        newCard.innerHTML = `
        <div class=" card card-compact bg-base-100 ">
            <img class="object-cover " src="${cards.thumbnail}" alt="Shoes" />
            <div class="card-body">
              <div class="flex gap-6 items-center justify-start">
                <img class="rounded-full h-12 w-12"  src="${cards.authors[0].profile_picture}" alt="">
                <h2 class="card-title">${cards.title}</h2>
              </div>
              <div class="flex justify-start  items-center ">
              <p>${cards.authors[0].profile_name}</p>
              
              ${verified}
              
              </div>
              <p>${cards.others.views} Views</p>
            </div>
           
          </div>
        `;
        cardContainer.appendChild(newCard);
      });
    };
    loadCardData();
  }
  fetchDataByCategories(selectedCategory, sortByView);
};

loadData();
