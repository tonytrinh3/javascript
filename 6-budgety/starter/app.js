const budgetController = (function(){

}
    
)();

const UIController = (function(){

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
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
const controller = (function(budgetCtrl, UICtrl){

    const ctrlAddItem = function(){

        //1. get the field input data
        //2. add the item to the budget controller
        //3. add the item to the UI
        //4. calculate the budget
        //5. display the budget on the UI

    }
    //you don't need to add the () to ctrlAddItem bc addeventlistener will call the function for us 
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress', function(event){
        //event.which is for older browser
        if (event.keyCode === 13 || event.which === 13){
            //when you press enter - you get 
            ctrlAddItem();
        }
    })

})(budgetController, UIController);