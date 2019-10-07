import Search from './models/Search';


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
    const query = 'pizza';
    
    if(query){
        //2. new search object and add to state
        state.search = new Search(query)

        //3. prepare UI for results

        //4. search for recipes
        //getResults() returns a promise so you need await to run it 
        await state.search.getResults();

        //5. render results on UI
        console.log(state.search.result);


    }
}
//e is event that is within callback function
document.querySelector('.search').addEventListener('submit', e =>{
    //you need this to prevent page from reloading every time you press button
    e.preventDefault();
    controlSearch();
})



