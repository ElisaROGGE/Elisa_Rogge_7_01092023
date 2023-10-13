function filterRecipes() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim().toLowerCase();

  let filteredRecipes = recipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    if (searchText !== "" || searchText.length >= 3) {
      return (
        searchText === "" ||
        recipeName.includes(searchText) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchText)
        ) ||
        recipe.description.toLowerCase().includes(searchText)
      );
    }

    return true;
  });

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
        // return filterRecipesByIngredient(recipe.ingredients, selectedTag)
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

function filterRecipesByIngredient(filteredRecipes, selectedIngredient) {
  filteredRecipes.some((ingredient) =>
    ingredient.ingredient
      .toLowerCase()
      .includes(selectedIngredient.toLowerCase())
  );
}

// function filterRecipesByAppliance(filteredRecipes, selectedAppliance) {
//   return filteredRecipes.filter((recipe) =>
//     recipe.appliance.toLowerCase().includes(selectedAppliance.toLowerCase())
//   );
// }

// function filterRecipesByUstensil(filteredRecipes, selectedUstensil) {
//     recipe.ustensils.some((ustensil) =>
//       ustensil.toLowerCase().includes(selectedUstensil.toLowerCase())
//     )
// }
