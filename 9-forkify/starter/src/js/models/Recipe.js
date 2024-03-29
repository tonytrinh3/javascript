import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    //a method
    async getRecipe(){
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error){
            console.log(error);
            alert('Something went wrong :{')
        }
    }

    calcTime(){
        //asumming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }


    parseIngredients(){
        const unitsLong = ['tablespoons','tablespoon', 'ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        //added in here in order to include kg and g
        const units = [...unitsShort, 'kg','g'];

        const newIngredients = this.ingredients.map(el =>{
            
            //1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,i) =>{
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //2) remove parenthese
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            //3) parse ingredients into count, unit, and ingredient
            //change the ingredient into an array by space. each word is now a word in array 
            const arrIng = ingredient.split(' ');
            //findIndex is like a loop - loops throw unitsShorts then see if the word in ingredient array is included in unitsShorts 
            //returns position of the unit
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
            

            let objIng;
            if(unitIndex > -1){
                //there is a unit
                //ex. 4 1/2 cups, arrcount is [4, 1/2] --> eval("4+1/2") --> 4.5
                //ex. 4 cups, arrcount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                //arrCount is the number of numbers before our unit
                if(arrCount.length ===1){
                    //count is the number itself
                    count = eval(arrIng[0].replace('-','+'));
                } else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1)
                }

            } else if (parseInt(arrIng[0],10)){
                //there is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };

            } else if (unitIndex === -1){
                //there is NO unit and NO number in 1st position
                //count is 1 by default if there is no number associated with it 
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient:ingredient
                };

            }
            return objIng;
           
        });
        this.ingredients = newIngredients;
    }

    updateServings(type){
        //Servings
        //this assigns newServings with minus the serving amount or add to serving ammount if type is dec or inc
        const newServings = type === 'dec' ? this.servings -1 : this.servings +1;
        console.log(this.servings);

        //ingredients 
        this.ingredients.forEach(ing => {
            //ing.count = ing.count * (newServings / this.servings)
            //ing.count = 2 * ( 3/4); newServings should be more or less than this.servings
            ing.count *= (newServings / this.servings);
        });
        //updating the this.servings property of object to the newServings
        this.servings = newServings;


    }
}
