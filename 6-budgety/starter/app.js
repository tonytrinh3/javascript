const budgetController = (function(){

    const Expense = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // let allExpenses = [];
    // let allIncomes= [];
    // let totalExpenses= 0;

    let data = {

        allItems:{
            exp: [],
            inc: []
        },
  
        totals:{
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type,des,val){
            let newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID =9
            //ID = last ID + 1


            //create new id
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else{
                ID = 0;
            }


            //create new item based on 'inc' or 'exp' type
            if( type === 'exp' ){
                newItem = new Expense(ID, des, val);
            } else if (type === "inc"){
                newItem = new Income(ID, des, val);
            }

            //the type is used to choose which array we are going to push into
            // push it into our data structure
            data.allItems[type].push(newItem);

            //to let other functions have access to new Item
            //return the new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    }

    

}
    
)();

const UIController = (function(){

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    };

    //return so info get made available to public
    return{
        //method
        //queryselector all in one place 
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        //you just want to pass the DOMstrings to the next function in order to keep DOMstrings in one spot
        getDOMstrings: function(){
            return DOMstrings;
        }


    }


})();

//you want function based input in order for the function to be more indepepdent and modular
//budgetCtrl and UICtrl are specific to controller
//but you are passing budgetController and UIController into this

//IIFE  - immediately-invoked function expression - things within a function that are executed when the function itself is executed
const controller = (function(budgetCtrl, UICtrl){

    //setupeventlisteners need to be called some how
    //we want to put all the codes we want to execute at the beginning into one function
    const setupEventListeners = function(){

        //only need DOM here for our event listeners
        const DOM = UICtrl.getDOMstrings();

        //you don't need to add the () to ctrlAddItem bc addeventlistener will call the function for us 
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(event){
            //event.which is for older browser
            if (event.keyCode === 13 || event.which === 13){
                //when you press enter - you get 
                ctrlAddItem();
            }
        })
    };



    const ctrlAddItem = function(){
        let input, newItem;

        //1. get the field input data
        input = UICtrl.getInput();
        console.log(input)
        //2. add the item to the budget controller
        //it returns an object

        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3. add the item to the UI
        //4. calculate the budget
        //5. display the budget on the UI

    }

    return {
        //public initization function to call the setupEventListeners - needed to call the eventlisteners
        //return from this function in order for the init to be public
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    }
    

})(budgetController, UIController);
//budgetcontroller and uicontroller are passed into this function

//you need to do this in order for init ("setupEventListeners()" and probably other functions) to run function
controller.init();