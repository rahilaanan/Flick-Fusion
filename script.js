
const buttonContainer = document.getElementById("button");
const cardContainer = document.getElementById("card-container");
 const error = document.getElementById("error-element");

let selectedCategory = 1000;

const loadData =async()=>{
const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
const data = await res.json();
const info = data.data
info.forEach(info =>{
    //console.log(info)

    const newBtn =document.createElement("button");
    newBtn.className ='btn bg-gray-300'
    newBtn.innerText =info.category;
    newBtn.addEventListener("click",()=> fetchDataByCategories(info.category_id))
    buttonContainer.appendChild(newBtn); 
   
})

function fetchDataByCategories(categoryID){
    selectedCategory =categoryID;
   const loadCardData =async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await res.json();
    const info =data.data;
    if(info.length === 0){
        error.classList.remove("hidden");
    }else{
        error.classList.add("hidden")
    }
    cardContainer.innerHTML =''
    info.forEach((cards)=>{
        let verified = '';
        if(cards.authors[0].verified){
verified = `<img src="https://cdn-icons-png.flaticon.com/128/4847/4847039.png" loading="lazy" alt="Approved " title="Approved " width="24" height="24">`
        }
        
        const newCard =document.createElement("div");
        newCard.innerHTML =`
        <div class="card card-compact bg-base-100 ">
            <figure><img class="" src="${cards.thumbnail}" alt="Shoes" /></figure>
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
    })
   }
   loadCardData()
}
fetchDataByCategories(selectedCategory);
}



loadData();
