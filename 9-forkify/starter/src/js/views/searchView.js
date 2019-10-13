import { elements } from './base';
//gets input info
export const getInput = () => elements.searchInput.value;

//to clear the searchinput value after you type it 
export const clearInput = () => {
    elements.searchInput.value = '';
}
//clear the food list when you search a new list...
//also clear page buttons
export const clearResults = () =>{
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
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
        <a class="results__link" href="#${recipe.recipe_id}">
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

//'type is prev or next
//type is button to go backward or forward
//data-goto is a data that is attached to the html element
const createButton = (page,type) =>`
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1 }>
        <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
        </svg>
    </button>
    `
;


//private function bc you aren't exporting it 
//resPerPage = results per page
//page is which page we are on 
const renderButtons = (page, numResults, resPerPage) => {
    //30 results / 10 results per page = 3 pages
    //math ceil is to round up to nearest page
    const pages = Math.ceil(numResults / resPerPage);
  
    //want to use let bc button keeps changing
    let button;
    if (page === 1 && pages > 1){
        //only button to go to next page 
        button = createButton(page,'next');
    } else if (page < pages){
        //both buttons
        button = `
            ${createButton(page,'prev')}
            ${createButton(page,'next')}
        `;
    } else if (page === pages && pages > 1 ){
        //if page 2 === number of pages 2 and number of pages is greater than 1
        //only button to go to prev page
        button = createButton(page,`prev`);
    } else {
        //when the search result is less than 10
        button = "";
    }
  
    //insert button in html

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);

};


//literally you are getting an array, and pushing them through each function
//this is the function that is going to be called when you click on the button
//you are rendering a new page when you click the next button
export const renderResults = (recipes, page = 1, resPerPage = 10) =>{
    //const start = 0;
    //RENDER RESULTS OF CURRENT PAGE
    const start = (page - 1 ) * resPerPage;
    const end = page*resPerPage;

//slice is the first point where you start to cut and end is where to end cut 
//end includes the last number but not the last number so 0-10 is great bc we want only 10 not 11 results
    recipes.slice(start,end).forEach(renderRecipe);

    //render page buttons
    renderButtons(page, recipes.length ,resPerPage);
};