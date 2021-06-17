
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



//onLoad functions
document.addEventListener("DOMContentLoaded", () => {
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
  const pInstructions = document.createElement("p")
  const pAuthor = document.createElement("p")

  title.innerText = recipe.title
  pDescription.innerText = recipe.shortDescription
  pIngredients.innerText = recipe.ingredients
  pInstructions.innerText = recipe.instructions
  pAuthor.innerText = recipe.author

  li.appendChild(title)
  li.appendChild(pDescription)
  li.appendChild(pIngredients)
  li.appendChild(pInstructions)
  li.appendChild(pAuthor)
  recipeList().appendChild(li)
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
// const searchFunctionBuilder = (key) => {
//   return (value) => {
//     fetch("http://localhost:3000/recipeBook")
//     .then(response => response.json())
//     .then(data => {
//       data.forEach(recipe => {
//         title.split(" ").find(el => el === value)
//       })
//     })

// }