
// Gobal get node variables
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
  attachSearchButtonFunction()
  attachViewAllRecipesFunction()

  displayAllRecipes()

  attachRecipeFormSubmit()
  attachAddStepButton()
})

const attachAddStepButton = () => {
  addStepButton().addEventListener('click', (e) => {
    e.preventDefault
    addStep()

  })
}

const attachSearchButtonFunction = () => {
  searchButton().addEventListener("click", searchRecipes)
}

const attachViewAllRecipesFunction = () => {
  viewAllRecipes().addEventListener("click", displayAllRecipes)
}

const attachRecipeFormSubmit = () => {
  recipeForm().addEventListener("submit", e => {
    e.preventDefault()
    createNewRecipe(getValuesFromInputs())
    recipeForm().reset()
  })
}

//displays one recipe
const displayRecipe = (recipe) => {
  const li = document.createElement("li")
  const title = document.createElement("h4")
  const olInstructions = document.createElement("ol")

  title.setAttribute("class", "brown-text text-darken-3")
  title.innerText = recipe.title

  li.appendChild(title)
  beautifyDisplayedElement(recipe.shortDescription, li, "Description")
  beautifyDisplayedElement(recipe.ingredients, li, "Ingredients")
  displayOrderedInstructions(recipe.instructions, olInstructions)
  li.appendChild(olInstructions)
  beautifyDisplayedElement(recipe.author, li, "Author")

  recipeList().appendChild(li)
}

//helper function to organize the instructions to display in an ordered list
const displayOrderedInstructions = (instructionArray, orderedList) => {
  instructionArray.forEach(instruction => {
    const li = document.createElement("li")
    li.setAttribute("class", "brown-text text-darken-3")
    li.innerText = instruction
    orderedList.appendChild(li)
  })
}

//helper function to display each part of the recipe
const beautifyDisplayedElement = (element, li, subheading) => {
  const h4 = document.createElement("h6")
  h4.setAttribute("class", "brown-text text-darken-3")
  const p = document.createElement("p")
  p.setAttribute("class", "brown-text text-darken-3")
  h4.innerText = subheading
  p.innerText = element
  li.appendChild(h4)
  li.appendChild(p)
}

//displays all recipes calling displayRecipe while looping through data from the response
const displayAllRecipes = () => {
  recipeList().innerHTML = ""
  fetch("http://localhost:3000/recipeBook")
  .then( response => response.json())
  .then(data => {
    data.forEach(element => {
      displayRecipe(element)
    });
  })
}

//Puts the values from the form into an object to pass to createRecipe in the fetch POST
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


//returns a function that takes a value as an argument to search the given key for the value.

const searchFunctionBuilder = (key) => {
  return (value) => {
    const recipesMatched = []
    fetch("http://localhost:3000/recipeBook")
    .then(response => response.json())
    .then(data => {
      data.forEach(recipe => {
        if (recipe[key].toLowerCase().includes(value.toLowerCase())) {
          recipesMatched.push(recipe)
        }
      })
      if (recipesMatched[0]) {
      recipeList().innerHTML = ""
      recipesMatched.forEach(recipe=>displayRecipe(recipe))
      } else {
        alert("No recipes matching that criteria were found.")
      } 
    })
  }
}

//makes the function to append to the search button
const searchRecipes = (e) => {
  e.preventDefault()
  searchFunctionBuilder(keySearchSelector().value)(searchInput().value)
}


