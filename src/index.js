let addNovel = false;
let editExisit = false;
let idHolder = null;
let nameHolder = null;

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
document.querySelector('.add-novel-form').addEventListener('submit',handleAddSubmit)
});

//rendering novel objs
function rendernovel(novel){
  const div = document.createElement('div')
  const novelContainer = document.querySelector('#novel-collection')
  div.className = "card"
  div.setAttribute('name',`${novel.title}`)

  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const h4 = document.createElement('h4')
  const divChap = document.createElement('div')
  const chap = document.createElement('p')
  const chapLable = document.createElement('lable')
  const divBtn = document.createElement('div')
  const del = document.createElement('button')
  const edit = document.createElement('button')

  divBtn.className = "buttonHolder"

  h2.textContent=`${novel.title}`
  div.appendChild(h2)

  img.setAttribute('src', `${novel.image}`)
  img.className = "novel-avatar"
  div.appendChild(img)

  chap.textContent = `${novel.chapters}`
  chapLable.textContent = `Currently on chapter`
  divChap.appendChild(chapLable)
  divChap.appendChild(chap)
  div.appendChild(divChap)

  h4.style.fontSize = `20px`
  if (novel.likes == "true")
  {
    h4.textContent = `Like ♥`
    h4.style.color = `red`
  }
  else
  {
    h4.textContent = `Like ♡`
    h4.style.color = `black`
  }
  div.appendChild(h4)

  edit.textContent = 'Edit'
  divBtn.appendChild(edit)

  del.textContent ='Delete'
  divBtn.appendChild(del)

  div.appendChild(divBtn)
  h4.addEventListener('click', () => {
    if (novel.likes == "true")
    {
      h4.textContent = `Like ♡`
      h4.style.color = `black`
      novel.likes = 'false'
    }
    else
    {
      h4.textContent = `Like ♥`
      h4.style.color = `red`  
      novel.likes = 'true'  
    }
    updateObj(novel)
  })

  edit.addEventListener('click', () => {
    
    idHolder = novel.id
    nameHolder = novel.title

    const editNovelContainer = document.querySelector(".editContainer")
    editNovelContainer.style.display = "block";

    const editNovelForm = document.querySelector(".edit-novel-form")
    if (editExisit){
      removeEdit(editNovelForm)
    }
    const br = document.createElement("br")
    const editNovelh = document.createElement("h3")

    editNovelh.textContent = "Edit Novel"
    editNovelForm.appendChild(editNovelh)

    const editTitle = document.createElement("input")
    editTitle.type="text"
    editTitle.name="editTitle"
    editTitle.setAttribute("class","input-text")
    editTitle.value =`${h2.textContent}`
    editNovelForm.appendChild(editTitle)
    editNovelForm.appendChild(br)

    const editImage = document.createElement("input")
    editImage.type="text"
    editImage.name="editImage"
    editImage.setAttribute("class","input-text")
    editImage.value =`${img.src}`
    editNovelForm.appendChild(editImage)
    editNovelForm.appendChild(br)

    const editChapters = document.createElement("input")
    editChapters.type="text"
    editChapters.name="editChapters"
    editChapters.setAttribute("class","input-text")
    editChapters.value =`${chap.textContent}`
    editNovelForm.appendChild(editChapters)
    editNovelForm.appendChild(br)

    const editSubmit = document.createElement("input")
    editSubmit.type="submit"
    editSubmit.name="editSubmit"
    editSubmit.value = "Edit Novel"
    editSubmit.setAttribute("class","submit")
    editNovelForm.appendChild(editSubmit)

    editExisit = true

    document.querySelector('.edit-novel-form').addEventListener('submit',handleEditSubmit)
  })

  del.addEventListener('click', () => {
    console.log(novel.id)
    deleteNovel(novel.id)
    div.remove()
  })

  novelContainer.appendChild(div)
}

function removeEdit(editForm){
  while(editForm.firstChild){
    editForm.removeChild(editForm.firstChild)
  }
  editExisit = false
}

//updates any modification to novelObj in db
function updateObj(novelObj){
  fetch(`http://localhost:3000/novels/${novelObj.id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body:JSON.stringify(novelObj)
  })
}

function handleEditSubmit(e){
  e.preventDefault()
  const title = e.target.editTitle.value
  const image = e.target.editImage.value
  const chap = e.target.editChapters.value
  let novelObj = {
    id:idHolder,
    title:title,
    image:image,
    chapters:chap,
  }
  const editNovelForm = document.querySelector(".edit-novel-form")
  const editNovelContainer = document.querySelector(".editContainer")
  editNovelContainer.style.display = "none";
  const novelCardUpdate = document.querySelector(`[name="${nameHolder}"`)

  novelCardUpdate.name = e.target.editTitle.value
  novelCardUpdate.querySelector('h2').textContent = `${title}`
  novelCardUpdate.querySelector('img').setAttribute('src',`${image}`)
  novelCardUpdate.querySelector('p').textContent =`${chap}`
  
  updateObj(novelObj)
  removeEdit(editNovelForm)

}

//handles the submit to create a new obj in db
function handleAddSubmit(e){
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

function deleteNovel(id){
  fetch(`http://localhost:3000/novels/${id}`,{
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

//grabs all novel obj in db
function getAllNovels(){
  fetch('http://localhost:3000/novels')
  .then(response => response.json())
  .then(novelData => novelData.forEach(novel => rendernovel(novel)))
}