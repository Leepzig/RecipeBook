
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
    recipeForm().reset()
  })
  addStepButton().addEventListener('click', addStep)
})

//displays one recipe
const displayRecipe = (recipe) => {
  const li = document.createElement("li")
  const title = document.createElement("h3")
  const olInstructions = document.createElement("ol")

  title.innerText = recipe.title
  li.appendChild(title)
  beautifyDisplayedElement(recipe.shortDescription, li, "Description")
  beautifyDisplayedElement(recipe.ingredients, li, "Ingredients")
  displayOrderedInstructions(recipe.instructions, olInstructions)
  li.appendChild(olInstructions)
  beautifyDisplayedElement(recipe.author, li, "Author")

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

//helper function to display each part of the recipe
const beautifyDisplayedElement = (element, li, subheading) => {
  const h4 = document.createElement("h4")
  const p = document.createElement("p")
  h4.innerText = subheading
  p.innerText = element
  li.appendChild(h4)
  li.appendChild(p)
}

//displays all recipes calling displayRecipe while looping through
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
          console.log("if recipe IS FOUND in IF log this: ", recipesMatched) 
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
//