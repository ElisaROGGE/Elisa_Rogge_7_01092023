function filterRecipes() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
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

    return true
  });

  displayRecipes(filteredRecipes);
}
