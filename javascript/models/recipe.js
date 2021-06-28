
class Recipe {
  
  static all = []
  
  constructor(title, description, ingredients, instructions, author ) {
    this.title = title
    this.description = description
    this.ingredients = ingredients
    this.instructions = instructions
    this.author = author
    Recipe.all.push(this)
  }

  //displays one recipe
displayRecipe = () => {
  const li = document.createElement("li")
  const title = document.createElement("h4")
  const olInstructions = document.createElement("ol")

  title.setAttribute("class", "brown-text text-darken-3")
  title.innerText = this.title

  li.appendChild(title)
  beautifyDisplayedElement(this.shortDescription, li, "Description")
  beautifyDisplayedElement(this.ingredients, li, "Ingredients")
  this.displayOrderedInstructions(olInstructions)
  li.appendChild(olInstructions)
  beautifyDisplayedElement(this.author, li, "Author")

  recipeList().appendChild(li)
}

//helper function to organize the instructions to display in an ordered list
displayOrderedInstructions = (orderedList) => {
  this.instructions.forEach(instruction => {
    const li = document.createElement("li")
    li.setAttribute("class", "brown-text text-darken-3")
    li.innerText = instruction
    orderedList.appendChild(li)
  })
}




}