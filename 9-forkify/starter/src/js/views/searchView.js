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

//this is to show all words in one line
const limitRecipeTitle = (title,limit = 17) => {
    const newTitle = [];

    /*
    'pasta with tomato and spinach'
    acc: 0  acc + cur.length = 5 so newTitle =['pasta']
    acc: 5  acc + cur.length = 9 so newTitle =['pasta', 'with']
    acc: 9  acc + cur.length = 15 so newTitle =['pasta', 'with', 'tomato']
    acc: 15  acc + cur.length = 18 so newTitle =['pasta', 'with', 'tomato']   - no and
    acc: 18  acc + cur.length = 24 so newTitle =['pasta', 'with', 'tomato']   - no and spinach
    */

    if (title.length > limit) {

        //split the line into separate words, you can use reduce bc title.split return array
        //you are able to loop bc of reduce()
        //acc is accumulator
        //cur is current
        title.split(' ').reduce((acc,cur) => {
            if (acc + cur.length <= limit ){
                newTitle.push(cur);
            }
            return acc + cur.length;
            //start with accumulator of zero
        }, 0);
        //return the result
        //join the array with spaces between words
        return `${newTitle.join(' ')} ...`;
    }

    //return title if title length is less than limit
    return title
}


//recipe are the individual recipe, part of each array, that you are pushing through
const renderRecipe = recipe => {
    const markup = 
    `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
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