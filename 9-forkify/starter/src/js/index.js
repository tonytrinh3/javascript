import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

//state is all data in one place in one object
// global state of the app
/*
-search object
-current recipe object
-shopping list object
-liked recipes
*/

const state = {};

//you need async here bc you are using an await within the function itself bc of getResults()
const controlSearch = async () =>{

    //1. get query from view
    //now you get input value from html as the query
    const query = searchView.getInput();
    console.log(query);
    
    if(query){
        //2. new search object and add to state
        state.search = new Search(query)
       
        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. search for recipes
        //getResults() returns a promise so you need await to run it 
        await state.search.getResults();

        //5. render results on UI
        //state.search.result is an array
        //you name .result bc you returned an object called this.result from getResults()
        clearLoader();
        console.log(state.search.result);
        searchView.renderResults(state.search.result);


    }
}
//e is event that is within callback function
elements.searchForm.addEventListener('submit', e =>{
    //you need this to prevent page from reloading every time you press button
    e.preventDefault();
    controlSearch();
})

//you need this in order to rerender the page with new results when you press button
//event delegation is needed to access the button
//so you touch the element above which is result__pages in order to touch the button
elements.searchResPages.addEventListener('click', e=>{
    //you use target.closest in order to able to click all of the button element to get the result you want
    const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})
