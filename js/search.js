function filterRecipes() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim().toLowerCase();

  let filteredRecipes = [];
  for (const recipe of recipes) {
    const recipeName = recipe.name.toLowerCase();
    const searchTextLower = searchText.toLowerCase();
    const hasSearchText = searchText !== "" || searchText.length >= 3;
    let matchFound = false;
  
    if (!hasSearchText) {
      filteredRecipes.push(recipe);
    } else {
      if (
        searchText === "" ||
        recipeName.includes(searchTextLower) ||
        recipe.description.toLowerCase().includes(searchTextLower)
      ) {
        matchFound = true;
      } else {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().includes(searchTextLower)) {
            matchFound = true;
            break;
          }
        }
      }
  
      if (matchFound) {
        filteredRecipes.push(recipe);
      }
    }
  }


  //Filter avec les tags
  filteredRecipes = filterTags(filteredRecipes);

  initListTags(filteredRecipes);
  updateTag("ingredients", tabIngredients);
  updateTag("appliances", tabAppliances);
  updateTag("ustensils", tabUstensils);

  console.log("filteredRecipes", filteredRecipes);

  displayRecipes(filteredRecipes);
}

function filterTags(filteredRecipes) {
  const selectedTags = Array.from(
    document.querySelectorAll("[data-tag-name][data-tag]")
  );
  if (selectedTags.length === 0) {
    return filteredRecipes;
  }

  return filteredRecipes.filter((recipe) => {
    return selectedTags.every((tagDiv) => {
      const selectedTagName = tagDiv.getAttribute("data-tag-name");
      const selectedTag = tagDiv.getAttribute("data-tag").toLowerCase();
      switch (selectedTagName) {
        case "ingredients":
          return recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(selectedTag)
          );
        case "appliances":
          return recipe.appliance.toLowerCase().includes(selectedTag);
        case "ustensils":
          return recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(selectedTag)
          );
        default:
          return false;
      }
    });
  });
}
