import { elements } from './base';
//gets input info
export const getInput = () => elements.searchInput.value;

//to clear the searchinput value after you type it 
export const clearInput = () => {
    elements.searchInput.value = '';
}
//clear the food list when you search a new list...
export const clearResults = () =>{
    elements.searchResList.innerHTML = '';
}

//recipe are the individual recipe, part of each array, that you are pushing through
const renderRecipe = recipe => {
    const markup = 
    `
    <li>
        <a class="results__link" href="${recipe.recipe.id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};



//literally you are getting an array, and pushing them through each function
export const renderResults = recipes =>{
    recipes.forEach(renderRecipe);
};