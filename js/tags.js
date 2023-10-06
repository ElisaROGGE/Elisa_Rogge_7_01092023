function initTag(nameTag, listTags) {
  const tagParent = document.querySelector(".tag");

  const filterTagDiv = document.createElement("div");
  filterTagDiv.className = "filterTag";

  const filterTagBtnDiv = document.createElement("div");
  filterTagBtnDiv.className = "filterTagBtn";

  const titleH3 = document.createElement("h3");
  titleH3.textContent = nameTag;

  const toggleButtonI = document.createElement("i");
  toggleButtonI.className = "fa-solid fa-chevron-down";

  filterTagBtnDiv.appendChild(titleH3);
  filterTagBtnDiv.appendChild(toggleButtonI);

  const contentTagDiv = document.createElement("div");
  contentTagDiv.className = "contentTag";

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "search");
  searchInput.className = "tag-search";

  const ulListe = document.createElement("ul");
  ulListe.className = "liste";
  const ulSelectedListe = document.createElement("ul");
  ulSelectedListe.className = "selected-list";

  listTags.forEach((tag) => {
    const liTag = document.createElement("li");
    liTag.className = "tag-liste";
    liTag.textContent = tag;
    liTag.setAttribute("data-tag-name", nameTag);
    ulListe.appendChild(liTag);

    addTag(liTag, tag);
  });
  toggleButton(filterTagBtnDiv, contentTagDiv);
  searchTag(searchInput, ulListe);

  contentTagDiv.appendChild(searchInput);
  contentTagDiv.appendChild(ulSelectedListe);
  contentTagDiv.appendChild(ulListe);

  filterTagDiv.appendChild(filterTagBtnDiv);
  filterTagDiv.appendChild(contentTagDiv);
  tagParent.appendChild(filterTagDiv);
}

function toggleButton(filterTagBtnDiv, contentTagDiv) {
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
}

function addTag(liTag, tag) {
  const selected = document.querySelector(".tag-selected");

  liTag.addEventListener("click", () => {
    if (liTag.classList.contains("selectFilter")) {
      liTag.classList.remove("selectFilter");
      const divTag = selected.querySelector(`div[data-tag="${tag}"]`);
      if (divTag) {
        deleteTag(divTag, liTag);
      }
    } else {
      const divTag = document.createElement("div");
      divTag.className = "divTag";
      divTag.setAttribute("data-tag", tag);
      const getTagName = liTag.getAttribute("data-tag-name");
      divTag.setAttribute("data-tag-name", getTagName)

      const newItem = document.createElement("span");
      newItem.textContent = tag;
      newItem.className = "p-2";

      const closeItem = document.createElement("i");
      closeItem.className = "fa-solid fa-xmark";

      liTag.classList.add("selectFilter");
      const selectedUl = liTag.closest("div").querySelector(".selected-list");
      selectedUl.appendChild(liTag);

      divTag.appendChild(newItem);
      divTag.appendChild(closeItem);
      selected.appendChild(divTag);
      filterRecipes();

      closeItem.addEventListener("click", () => {
        deleteTag(divTag, liTag);
      });
    }
  });
}

function deleteTag(divTag, liTag) {
  divTag.remove();
  liTag.classList.remove("selectFilter");
  const ulListe = liTag.closest("div").querySelector(".liste");
  ulListe.appendChild(liTag);
}

function searchTag(searchInput, ulListe) {
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    ulListe.querySelectorAll("li").forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      if (itemText.includes(searchText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
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

  const toLowerCaseIfString = (str) =>
    typeof str === "string" ? str.toLowerCase() : str;

  recipes.forEach((recipe) => {
    if (recipe.appliance)
      uniqueAppliances.add(toLowerCaseIfString(recipe.appliance));
    if (recipe.ingredients) {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient)
          uniqueIngredients.add(toLowerCaseIfString(ingredient.ingredient));
      });
    }
    if (recipe.ustensils) {
      recipe.ustensils.forEach((ustensil) => {
        uniqueUstensils.add(toLowerCaseIfString(ustensil));
      });
    }
  });

  tabAppliances = [...uniqueAppliances];
  tabIngredients = [...uniqueIngredients];
  tabUstensils = [...uniqueUstensils];

  tabAppliances.sort();
  tabIngredients.sort();
  tabUstensils.sort();
}
