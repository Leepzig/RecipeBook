class Api {


  //displays all recipes calling displayRecipe while looping through data from the response
  static displayAllRecipes = () => {
    recipeList().innerHTML = ""
    fetch("http://localhost:3000/recipeBook")
    .then( response => response.json())
    .then(data => {
      data.forEach(recipe => {
        recipe = new Recipe(recipe.title, recipe.shortDescription, recipe.ingredients, recipe.instructions, recipe.author)
        Recipe.all.push(recipe)
        recipe.displayRecipe()
      });
    })
  }


//uses fetch to post the data to the server
static createNewRecipe = (recipe) => {
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
    .then(recipe => {
      recipeList().innerHTML = ""
      recipe = new Recipe(recipe.title, recipe.shortDescription, recipe.ingredients, recipe.instructions, recipe.author)
      recipe.displayRecipe()
  })
  .catch(error => console.log(error.message))
}







  static searchFunctionBuilder = (key) => {
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
        recipesMatched.forEach(recipe => {
          recipe = new Recipe(recipe.title, recipe.shortDescription, recipe.ingredients, recipe.instructions, recipe.author)
          recipe.displayRecipe()
        })
        } else {
          alert("No recipes matching that criteria were found.")
        } 
      })
    }
  }
  
  //makes the function to append to the search button
  static searchRecipes = (e) => {
    e.preventDefault()
    Api.searchFunctionBuilder(keySearchSelector().value)(searchInput().value)
  }

}