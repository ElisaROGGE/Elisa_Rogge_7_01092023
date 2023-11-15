function initTag(nameTag, listTags) {
  const tagParent = document.querySelector(".tag");

  const tagDiv = document.querySelector(".filter-tag");

  const filterTagDiv = document.createElement("div");
  filterTagDiv.className = "filterTag";
  filterTagDiv.id = nameTag;

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

  const divSearch = document.createElement("div");
  divSearch.className = "search-tag-parent";
  const iconSearch = document.createElement("i");
  iconSearch.className = "fa-solid fa-magnifying-glass";

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "search");
  searchInput.className = "tag-search";

  const ulListe = document.createElement("ul");
  ulListe.className = "liste";
  const ulSelectedListe = document.createElement("ul");
  ulSelectedListe.className = "selected-list";

  createTag(listTags, ulListe, nameTag);
  toggleButton(filterTagBtnDiv, contentTagDiv);
  searchTag(searchInput, ulListe);

  divSearch.appendChild(searchInput);
  divSearch.appendChild(iconSearch);
  contentTagDiv.appendChild(divSearch);
  contentTagDiv.appendChild(ulSelectedListe);
  contentTagDiv.appendChild(ulListe);

  filterTagDiv.appendChild(filterTagBtnDiv);
  filterTagDiv.appendChild(contentTagDiv);
  tagDiv.appendChild(filterTagDiv);
  tagParent.appendChild(tagDiv);
}

function toggleButton(filterTagBtnDiv, contentTagDiv) {
  filterTagBtnDiv.addEventListener("click", () => {
    if (
      contentTagDiv.style.display === "none" ||
      contentTagDiv.style.display === ""
    ) {
      contentTagDiv.style.display = "block";
      const icon = filterTagBtnDiv.querySelector(".fa-chevron-down");
      if (icon) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
      }
    } else {
      contentTagDiv.style.display = "none";
      const icon = filterTagBtnDiv.querySelector(".fa-chevron-up");
      if (icon) {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
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
      divTag.setAttribute("data-tag-name", getTagName);

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

      updateDeleteTagInList();
      // const ulElement = document.querySelector(".liste");
      // const liElements = ulElement.querySelectorAll(".tag-liste");

      // liElements.forEach((liElement) => {
      //   const dataTagValue = divTag.getAttribute("data-tag");
      //   const liText = liElement.textContent;

      //   if (dataTagValue === liText) {
      //     liElement.remove();
      //   }
      // });
    }
  });
}

function updateDeleteTagInList() {
  const listesTags = document.querySelectorAll(".filterTag");
  for (const listeTags of listesTags) {
    deleteTagInList(listeTags.id);
  }
}

function deleteTagInList(tagName) {
  const selectedListes = document.querySelectorAll(
    "#" + tagName + " .selected-list li"
  );
  const liste = document.querySelectorAll("#" + tagName + " .liste  li");

  console.log(selectedListes, liste);

  for (const selectedListe of selectedListes) {
    for (const item of liste) {
      if (item.textContent === selectedListe.textContent) {
        item.remove();
      }
    }
  }
}

function deleteTag(divTag, liTag) {
  divTag.remove();
  const getTagName = liTag.getAttribute("data-tag-name");
  liTag.classList.remove("selectFilter");
  console.log(liTag.closest("div"));
  const ulListe = liTag.closest("div").querySelector(".liste");
  ulListe.appendChild(liTag);
  filterRecipes();
  updateDeleteTagInList();
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
  tabAppliances = [];
  tabIngredients = [];
  tabUstensils = [];

  tabAppliances = [...uniqueAppliances];
  tabIngredients = [...uniqueIngredients];
  tabUstensils = [...uniqueUstensils];

  tabAppliances.sort();
  tabIngredients.sort();
  tabUstensils.sort();
}

function updateTag(nameTag, listTags) {
  const ulListe = document.querySelector("#" + nameTag + " ul.liste");
  ulListe.innerHTML = "";

  createTag(listTags, ulListe, nameTag);
}

function createTag(listTags, ulListe, nameTag) {
  listTags.forEach((tag) => {
    const liTag = document.createElement("li");
    liTag.className = "tag-liste";
    liTag.textContent = tag;
    liTag.setAttribute("data-tag-name", nameTag);
    ulListe.appendChild(liTag);

    addTag(liTag, tag);
  });
}
