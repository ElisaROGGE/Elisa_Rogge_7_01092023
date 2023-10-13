let tabIngredients = [];
let tabAppliances = [];
let tabUstensils = [];

function init(recipes) {
  displayRecipes(recipes);
  initListTags(recipes);
  initTag("ingredients", tabIngredients);
  initTag("appliances", tabAppliances);
  initTag("ustensils", tabUstensils);
  const totalRecipes = document.querySelector(".total");
  totalRecipes.textContent = recipes.length + " Recettes";
}

init(recipes);
