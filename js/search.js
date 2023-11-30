function filterRecipes() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim().toLowerCase();

  let filteredRecipes = recipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    if (searchText && searchText.length >= 3) {
      return (
        recipeName.includes(searchText) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchText)
        ) ||
        recipe.description.toLowerCase().includes(searchText)
      );
    }

    return true;
  });

  filteredRecipes = filterTags(filteredRecipes);

  const totalRecipes = document.querySelector(".total");

  initListTags(filteredRecipes);
  updateTag("Ingredients", tabIngredients);
  updateTag("Appareils", tabAppliances);
  updateTag("Ustensiles", tabUstensils);

  totalRecipes.textContent = filteredRecipes.length + " Recettes";

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
        case "Ingredients":
          return recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(selectedTag)
          );
        case "Appareils":
          return recipe.appliance.toLowerCase().includes(selectedTag);
        case "Ustensiles":
          return recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(selectedTag)
          );
        default:
          return false;
      }
    });
  });
}
