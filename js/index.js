let tabIngredients = [];
let tabAppliances = [];
let tabUstensils = [];

function init(recipes) {
  displayRecipes(recipes);
  initListTags(recipes);
  initTag("Ingredients", tabIngredients);
  initTag("Appareils", tabAppliances);
  initTag("Ustensiles", tabUstensils);
  const totalRecipes = document.querySelector(".total");
  totalRecipes.textContent = recipes.length + " Recettes";
}

init(recipes);
