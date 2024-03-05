
const buttonContainer = document.getElementById("button");
const loadData =async()=>{
const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
const data = await res.json();
const info = data.data
info.forEach(info =>{
    console.log(info)

    const newBtn =document.createElement("button");
    newBtn.innerText =info.category;
    buttonContainer.appendChild(newBtn); 
})

}



loadData();