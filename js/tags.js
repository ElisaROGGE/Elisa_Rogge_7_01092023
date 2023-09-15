function initTag(nameTag, listTags) {
  const tagParent = document.querySelector(".tag");

  // const select = document.createElement("select");
  // select.className =
  //   "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  // select.id = nameTag;

  // const titleOption = document.createElement("option");
  // titleOption.value = "";
  // titleOption.textContent = nameTag.charAt(0).toUpperCase() + nameTag.slice(1);
  // titleOption.selected = true;
  // titleOption.disabled = true;
  // select.appendChild(titleOption);

  // listTags.forEach((tag) => {
  //   const option = document.createElement("option");
  //   option.value = tag;
  //   option.textContent = tag;
  //   select.appendChild(option);
  // });
  const filterTagDiv = document.createElement("div");
  filterTagDiv.className = "filterTag";

  const filterTagBtnDiv = document.createElement("div");
  filterTagBtnDiv.className = "filterTagBtn";

  const titleH3 = document.createElement("h3");
  titleH3.textContent = nameTag;

  const toggleButtonI = document.createElement("i");
  toggleButtonI.textContent = "v";

  filterTagBtnDiv.appendChild(titleH3);
  filterTagBtnDiv.appendChild(toggleButtonI);

  const contentTagDiv = document.createElement("div");
  contentTagDiv.className = "contentTag";

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("placeholder", "Recherchez un tag");

  const ulListe = document.createElement("ul");
  ulListe.className = "liste";

  listTags.forEach((tag) => {
    const liTag = document.createElement("li");
    liTag.textContent = tag;
    ulListe.appendChild(liTag);
  });
  filterTagBtnDiv.addEventListener("click", () => {
    if (
      contentTagDiv.style.display === "none" ||
      contentTagDiv.style.display === ""
    ) {
      contentTagDiv.style.display = "block";
    } else {
      contentTagDiv.style.display = "none";
    }
  });

  contentTagDiv.appendChild(searchInput);
  contentTagDiv.appendChild(ulListe);

  filterTagDiv.appendChild(filterTagBtnDiv);
  filterTagDiv.appendChild(contentTagDiv);
  tagParent.appendChild(filterTagDiv);
}

function initListAppliances(recipe, uniqueAppliances) {
  uniqueAppliances.add(recipe.appliance);
}

function initListIngredients(recipes, uniqueIngredients) {
  recipes.ingredients.forEach((ingredient) => {
    const ingredientName = ingredient.ingredient;
    if (ingredientName) {
      uniqueIngredients.add(ingredientName);
    }
  });
}

function initListUstensils(recipes, uniqueUstensils) {
  recipes.ustensils.forEach((ustensil) => {
    uniqueUstensils.add(ustensil);
  });
}

function initListTags(recipes) {
  const uniqueAppliances = new Set();
  const uniqueIngredients = new Set();
  const uniqueUstensils = new Set();

  recipes.forEach((recipe) => {
    initListAppliances(recipe, uniqueAppliances);
    initListIngredients(recipe, uniqueIngredients);
    initListUstensils(recipe, uniqueUstensils);
  });

  tabAppliances = [...uniqueAppliances];
  tabIngredients = [...uniqueIngredients];
  tabUstensils = [...uniqueUstensils];

  tabAppliances.sort();
  tabIngredients.sort();
  tabUstensils.sort();
}
