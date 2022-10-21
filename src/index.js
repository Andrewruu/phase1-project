let addNovel = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-novel-btn");
  const novelFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide/show form
    addNovel = !addNovel;
    if (addNovel) {
      novelFormContainer.style.display = "block";
    } else {
      novelFormContainer.style.display = "none";
    }
  });
  // grab all nobel obj in db
getAllNovels()
document.querySelector('.add-novel-form').addEventListener('submit',handleSubmit)
});

//rendering novel objs
function rendernovel(novel){
  const div = document.createElement('div')
  const novelContainer = document.querySelector('#novel-collection')
  div.className = "card"

  div.innerHTML = `
  <h2>${novel.name}</h2>
  <img src="${novel.image}" class="novel-avatar" />
  <p>${novel.likes} Likes</p>
  <button class="like-btn" id="${novel.id}" onClick="updateLikes(${novel.id})">Like ❤️</button>
  `
  div.querySelector('.like-btn').addEventListener('click', () => {
    novel.likes+= 1
    div.querySelector('p').textContent = `${novel.likes} Likes`
    updateLikes(novel)
  })


  novelContainer.appendChild(div)
}

//updates any modification to novelObj in db
function updateLikes(novelObj){
  fetch(`http://localhost:3000/novels/${novelObj.id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body:JSON.stringify(novelObj)
  })
}

//handles the submit to create a new obj in db
function handleSubmit(e){
  e.preventDefault()
  let novelObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  rendernovel(novelObj)
  addNewNovel(novelObj)
}

//Adds the new obj to db
function addNewNovel(novelObj){
  fetch('http://localhost:3000/novels',{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body:JSON.stringify(novelObj)
  })
}

//grabs all novel obj in db
function getAllNovels(){
  fetch('http://localhost:3000/novels')
  .then(response => response.json())
  .then(novelData => novelData.forEach(novel => rendernovel(novel)))
}