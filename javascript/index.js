

  const recipeList = () => document.querySelector("#recipe-list")
  const titleInput = () => document.querySelector("#title-input")
  const shortDescriptionInput = () => document.querySelector("#short-description-input")
  const ingredientsInput = () => document.querySelector("#ingredients-input")
  const instructionsInput = () => document.querySelector("#instructions-input")
  const authorInput = () => document.querySelector("#author-input")
  const recipeForm = () => document.querySelector("#recipe-form")




document.addEventListener("DOMContentLoaded", () => {
  displayAllRecipes()
  recipeForm().addEventListener("submit", e => {
    e.preventDefault()
    createNewRecipe(getValuesFromInputs())
  })
})

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

const displayAllRecipes = () => {
  fetch("http://localhost:3000/recipeBook")
  .then( response => response.json())
  .then(data => {
    data.forEach(element => {
      displayRecipe(element)
    });
  })
}

const getValuesFromInputs = () => {
  const recipe = {
    title:titleInput().value,
    shortDescription:shortDescriptionInput().value,
    ingredients:ingredientsInput().value,
    instructions:instructionsInput().value,
    author:authorInput().value
  }
  return recipe
}

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