function initTag(nameTag, listTags) {
    const tagParent = document.querySelector(".tag");

    const select = document.createElement("select");
    select.className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    select.id = nameTag;

    const titleOption = document.createElement("option");
    titleOption.value = ""; 
    titleOption.textContent = nameTag.charAt(0).toUpperCase() + nameTag.slice(1);
    titleOption.selected = true
    titleOption.disabled = true
    select.appendChild(titleOption);

    listTags.forEach((tag) => {
        const option = document.createElement("option");
        option.value = tag;
        option.textContent = tag; 
        select.appendChild(option);
    });

    tagParent.appendChild(select);

    console.log(select);
}

const uniqueAppliances = new Set();
const uniqueIngredients = new Set();
const uniqueUstensils = new Set();

function initListAppliances(recipe) {
    uniqueAppliances.add(recipe.appliance);
}

function initListIngredients(recipes) {
    recipes.ingredients.forEach((ingredient) => {
        const ingredientName = ingredient.ingredient;
        if (ingredientName) {
            uniqueIngredients.add(ingredientName);
        }
    });
}

function initListUstensils(recipes) {
    recipes.ustensils.forEach((ustensil) => {
        uniqueUstensils.add(ustensil);
    });
}

function initListTags(recipes) {
    recipes.forEach((recipe) => {
        initListAppliances(recipe);
        initListIngredients(recipe);
        initListUstensils(recipe);
     });

    tabAppliances = [...uniqueAppliances];
    tabIngredients = [...uniqueIngredients];
    tabUstensils = [...uniqueUstensils];

    tabAppliances.sort();
    tabIngredients.sort();
    tabUstensils.sort();
}
