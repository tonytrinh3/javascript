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
        }
    }
}
    
)();

const UIController = (function(){

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

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
        
        //obj is probably data
        addListItem: function(obj, type){
            //create html string with placeholder text 
            let html, newHtml, element;

            //html = '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html =         
                `<div class="item clearfix" id="income-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html =
                `<div class="item clearfix" id="expense-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            }
            //replace the placeholder text with some actual data
            //since html is a string now, you can find the string and replace it with new value 
            newHtml = html.replace('%id%', obj.id);
            //you need to do replace on newhtml to keep the replace train going
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            //insert the html into dom
            //i think beforeend is something for insertAdjacentElement
            //need to change to insertadjacenthtml in order to insert the html string
            //https://stackoverflow.com/questions/42628635/element-insertadjacenthtml-api-throws-error-in-chrome-55-0-2883-87
            //
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        //you just want to pass the DOMstrings to the next function in order to keep DOMstrings in one spot
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
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
        console.log(newItem);
        //3. add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //4. calculate the budget
        //5. display the budget on the UI
    };

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