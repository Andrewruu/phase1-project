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

  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  const chap = document.createElement('p')

  h2.textContent=`${novel.title}`
  div.appendChild(h2)

  img.setAttribute('src', `${novel.image}`)
  img.className = "novel-avatar"
  div.appendChild(img)

  chap.textContent = `Currently on ${novel.chapters} chapter`
  div.appendChild(chap)

  p.style.fontSize = `20px`
  if (novel.likes)
  {
    p.textContent = `Like ♥`
    p.style.color = `red`
  }
  else
  {
    p.textContent = `Like ♡`
    p.style.color = `black`
  }
  div.appendChild(p)


  p.addEventListener('click', () => {
    if (novel.likes)
    {
      p.textContent = `Like ♡`
      p.style.color = `black`
      novel.likes = false
    }
    else
    {
      p.textContent = `Like ♥`
      p.style.color = `red`  
      novel.likes = true  
    }
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
    title:e.target.title.value,
    image:e.target.image.value,
    chapters:e.target.chapters.value,
    likes:e.target.Like.value
  }

  console.log(novelObj)
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