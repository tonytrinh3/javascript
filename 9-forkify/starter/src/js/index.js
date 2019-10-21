import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
window.state = state;

/*
*SEARCH CONTROLLER
*/



//you need async here bc you are using an await within the function itself bc of getResults()
const controlSearch = async () =>{

    //1. get query from view
    //now you get input value from html as the query
    const query = searchView.getInput();

    
    if(query){
        //2. new search object and add to state
        state.search = new Search(query)

       

       
        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4. search for recipes
            //getResults() returns a promise so you need await to run it 
            await state.search.getResults();
            console.log(state.search.result);
           
            //5. render results on UI
            //state.search.result is an array
            //you name .result bc you returned an object called this.result from getResults()
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(err){
            alert("something is wrong - oh well");
        }


    }
}
//e is event that is within callback function
//to click button to do search
elements.searchForm.addEventListener('submit', e =>{
    //you need this to prevent page from reloading every time you press button
    e.preventDefault();
    controlSearch();
});




//you need this in order to rerender the page with new results when you press search button
//event delegation is needed to access the button
//so you touch the element above which is result__pages in order to touch the button
elements.searchResPages.addEventListener('click', e=>{
    //you use target.closest in order to able to click all of the button element to get the result you want
    const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        
        searchView.clearResults();
        //wow you actually need gotopage to go to the next page
        //you can actually pass the number of results you want here as well... but you can also keep it 10 in the original function
        searchView.renderResults(state.search.result, goToPage);
    }
})

/*
*RECIPE CONTROLLER
*/

const controlRecipe = async () => {
    //window.location is the entire url
    //hash is just # in url
    //get id from url
    //you can use replace bc window.location.hash is a string
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id){
        //prepare ui for changes
    
        recipeView.clearRecipe();
        //renderloader is the spinning thing - you need to pass parent div
        renderLoader(elements.recipe);

        //highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        };





        //create new recipe object
        //you created a new line within state call state.recipe and it now has the new class
        state.recipe = new Recipe(id);

        //you need this try/catch because it is an await and could also go wrong bc getRecipe() is an await and could go wrong too
        try{
            //get recipe data
            //await so you can reload recipe in background
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader();
            //lesson 157 - at the moment, if you don't have likes persist when you reload then there will be a trigger in error bc state.likes doesn't exist yet 
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            
        } catch(err){
            alert('Error processing recipe!')
        }


    }

};

//window is global object
//window.addEventListener('hashchange', controlRecipe);
//load event fires every time page loads
//oh..so with window.load - when you reload the page, the controlRecipe still fires... - in order to make the content on the page stagnant? 
//hashchange is tagged onto window object - calls controlRecipe when there is a change in hash content in url
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

/*
*LIST CONTROLLER
*/

const controlList = () =>{
    //CREATE A NEW LIST IF THERE is none yet
    if (!state.list){
        //List() is empty
        state.list = new List();
    };

    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el =>{
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};


elements.shopping.addEventListener('click', e =>{
    //closet is used, anything you press under the div shopping__item, you will retrieve the dataset...
    const id = e.target.closest('.shopping__item').dataset.itemid; 

    //handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete from state
        state.list.deleteItem(id);

        //Delete from UI
        listView.deleteItem(id);
    } else if (e.target.matches(".shopping__count-value, .shopping__count-value *")){
        const val = parseFloat(e.target.value,10);
        state.list.updateCount(id,val);
    }
});


/*
*LIKE CONTROLLER
*/

//testing
state.likes = new Likes();

const controlLike = () =>{
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    //User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)){
        //Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        //Toggle the like button
        likesView.toggleLikeBtn(true);

        //Add like to UI list
        console.log(state.likes);


        // User HAS liked current recipe
    } else {
        //remove like from the state
        state.likes.deleteLike(currentID);
        //toggle the like button
        likesView.toggleLikeBtn(false);

        //remove like from UI list
        console.log(state.likes);
    }
}


//Handling recipe button clicks 
elements.recipe.addEventListener('click', e =>{
    //.btn-decrease * means any child of btn-decrease
    //you use match in order to allow you press button, or svg, use and it all allow you to use match 
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        //Decrease button is clicked
        //remember that state.recipe comes from the object new Recipe, which is created from Recipe.js
        //you can then use updateServings method with state.recipe 
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        //Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        // Like controller
        controlLike();
    }
    console.log(state.recipe);
});

window.l = new List();