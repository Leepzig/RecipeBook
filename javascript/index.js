
// get node variables
  const recipeList = () => document.querySelector("#recipe-list")
  const titleInput = () => document.querySelector("#title-input")
  const shortDescriptionInput = () => document.querySelector("#short-description-input")
  const ingredientsInput = () => document.querySelector("#ingredients-input")
  const instructionsInput = () => document.querySelector("#instructions-input-list")
  const instructionsInputList = () => document.querySelectorAll("#instructions-input-list textarea")
  const authorInput = () => document.querySelector("#author-input")
  const recipeForm = () => document.querySelector("#recipe-form")
  const addStepButton = () => document.querySelector("#addStepButton")
  const viewAllRecipes = () => document.querySelector("#view-all")
  const searchButton = () => document.querySelector("#search-button")
  const keySearchSelector = () => document.querySelector("#key-search")
  const searchInput = () => document.querySelector("#search-input")

//onLoad functions
document.addEventListener("DOMContentLoaded", () => {
  searchButton().addEventListener("click", searchRecipes)
  viewAllRecipes().addEventListener("click", displayAllRecipes)
  displayAllRecipes()
  recipeForm().addEventListener("submit", e => {
    e.preventDefault()
    createNewRecipe(getValuesFromInputs())
  })
  addStepButton().addEventListener('click', addStep)
})

//displays one recipe
const displayRecipe = (recipe) => {
  const li = document.createElement("li")
  const title = document.createElement("h3")
  const pDescription = document.createElement("p")
  const pIngredients = document.createElement("p")
  const olInstructions = document.createElement("ol")
  const pAuthor = document.createElement("p")

  title.innerText = recipe.title
  pDescription.innerText = recipe.shortDescription
  pIngredients.innerText = recipe.ingredients
  displayOrderedInstructions(recipe.instructions, olInstructions)
  pAuthor.innerText = recipe.author

  li.appendChild(title)
  li.appendChild(pDescription)
  li.appendChild(pIngredients)
  li.appendChild(olInstructions)
  li.appendChild(pAuthor)
  recipeList().appendChild(li)
}

//organizes the instructions to display in an ordered list
const displayOrderedInstructions = (instructionArray, orderedList) => {
  //debugger
  instructionArray.forEach(instruction => {
    const li = document.createElement("li")
    li.innerText = instruction
    orderedList.appendChild(li)
  })
}

//displays all recipes calling displayRecipe while looping through
const displayAllRecipes = () => {
  fetch("http://localhost:3000/recipeBook")
  .then( response => response.json())
  .then(data => {
    data.forEach(element => {
      displayRecipe(element)
    });
  })
}

//obtains the values from the form to use in creation of new recipe
const getValuesFromInputs = () => {
  const recipe = {
    title:titleInput().value,
    shortDescription:shortDescriptionInput().value,
    ingredients:ingredientsInput().value,
    instructions:[],
    author:authorInput().value
  }
  instructionsInputList().forEach(el=> {
    recipe.instructions.push(el.value)
  })
  return recipe
}


//uses fetch to post the data to the server
const createNewRecipe = (recipe) => {
  const fetchConfiguration = {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(recipe)
  }

  fetch("http://localhost:3000/recipeBook", fetchConfiguration)
  .then(response => response.json())
  .then(data => {
    recipeList().innerHTML = ""
    displayRecipe(data)
  })
  .catch(error => console.log(error.message))
} 


//adds another text area to instructions so that each step has its own text box.
const addStep = () => {
  const li = document.createElement("li")
  const textarea = document.createElement("textarea")
  textarea.setAttribute("rows", "2")
  textarea.setAttribute("columns", "25")

  li.appendChild(textarea)
  instructionsInput().appendChild(li)
}


//search function used to find a specific recipe...by what?
//What would I want to search for?
//ingredients, title, author, maybe key words, or tags?
//title:grilled cheese

const searchFunctionBuilder = (key) => {
  
  return (value) => {
    let valueFound
    fetch("http://localhost:3000/recipeBook")
    .then(response => response.json())
    .then(data => {
      data.forEach(recipe => {
        //debugger
        if (recipe[key].toLowerCase().includes(value.toLowerCase())) {
          console.log(recipe)
          recipeList().innerHTML = ""
          displayRecipe(recipe)
          valueFound = true
          return valueFound
        } else {
          valueFound = false
          return valueFound
        }
      })
    })
    if (valueFound === false) {
      alert(`value not found!`)
    }
  }
}


const searchRecipes = (e) => {
  e.preventDefault()
  searchFunctionBuilder(keySearchSelector().value)(searchInput().value)
}


// const search = (key, value) => {
//   fetch("http://localhost:3000/recipeBook")
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(recipe => {
//       if (recipe[key].includes(value)) {
//         recipeList().innerHTML = ""
//         displayRecipe(recipe)
//       }
//     })
//   })
// }


//Stretch Goals
//Delete, Edit, comment, 
//fix the add step button