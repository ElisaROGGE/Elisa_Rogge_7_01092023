function getRecipeCardDOM(recipe) {
  const picture = `img/${recipe.image}`;
  const article = document.createElement("article");
  const cardInfo = document.createElement("div");
  const timeWithImage = document.createElement("div")
  timeWithImage.className = "timeWithImage"
  const time = document.createElement("span")
  time.className = "time"
  time.textContent = recipe.time + "min"
  article.className = "recipe-card";
  cardInfo.className = "card-info";
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  const h2 = document.createElement("h2");
  h2.textContent = recipe.name;

  const recette = document.createElement("div");
  recette.textContent = "Recette";
  recette.style.color = "grey";
  recette.style.fontWeight = "600";
  const ingredientTitle = document.createElement("div");
  ingredientTitle.textContent = "Ingrédients";
  ingredientTitle.style.color = "grey";
  ingredientTitle.style.fontWeight = "600";
  const description = document.createElement("span");
  description.textContent = recipe.description;
  description.className = "description";

  const ingredientList = document.createElement("div");
  ingredientList.className = "ingredients";
  recipe.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("div");
    ingredientItem.className = "ingredient-item";
    const ingredientQuantity = document.createElement("div");
    ingredientQuantity.className = "quantity";
    let ingredientText = ingredient.ingredient;
    let ingredientQty = "";

    if (ingredient.quantity) {
      ingredientQty = `${ingredient.quantity} `;
    }

    if (ingredient.unit) {
      ingredientQty = `${ingredient.unit}`;
    }
    if (ingredient.unit && ingredient.quantity) {
      ingredientQty = `${ingredient.quantity} ${ingredient.unit}`;
    }

    ingredientItem.textContent = ingredientText;
    ingredientQuantity.textContent = ingredientQty;
    ingredientList.appendChild(ingredientItem);
    ingredientItem.appendChild(ingredientQuantity);
  });

  timeWithImage.appendChild(time)
  timeWithImage.appendChild(img)
  article.appendChild(timeWithImage);
  article.appendChild(cardInfo);
  cardInfo.appendChild(h2);
  cardInfo.appendChild(recette);
  cardInfo.appendChild(description);
  cardInfo.appendChild(ingredientTitle);
  cardInfo.appendChild(ingredientList);

  return article;
}

window.onload = function() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.querySelector(".icon");

  searchButton.addEventListener("click", filterRecipes);
  searchInput.addEventListener("input", handleInput);

  function handleInput(event) {
    filterRecipes();
  }
};

function displayRecipes(recipes) {
  const cardSection = document.querySelector(".card");
  cardSection.innerHTML = "";
  recipes.forEach((recipe) => {
    const userCardDOM = getRecipeCardDOM(recipe);
    cardSection.appendChild(userCardDOM);
  });
}

