


//onLoad functions
document.addEventListener("DOMContentLoaded", () => {
  attachSearchButtonFunction()
  attachViewAllRecipesFunction()

  Api.displayAllRecipes()

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
  searchButton().addEventListener("click", Api.searchRecipes)
}

const attachViewAllRecipesFunction = () => {
  viewAllRecipes().addEventListener("click", Api.displayAllRecipes)
}

const attachRecipeFormSubmit = () => {
  recipeForm().addEventListener("submit", e => {
    e.preventDefault()
    Api.createNewRecipe(getValuesFromInputs())
    recipeForm().reset()
  })
}




//helper function
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


//helper function
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

//helper function
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




