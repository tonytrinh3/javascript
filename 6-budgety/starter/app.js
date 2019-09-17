const budgetController = (function(){

    const Expense = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0){
            this.percentage = Math.round((this.value/totalIncome)*100);
        } else {
            this.percentage=-1;
        }

    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    const Income = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    //we want to make function private
    const calculateTotal = function(type) {
        
        let sum = 0;

        data.allItems[type].forEach(function(currentElement){
            console.log(currentElement);
            sum += currentElement.value;
        });

        data.totals[type] = sum;
        console.log(data.totals[type]);

    }

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
        },
        budget: 0,
        //-1 is used for non existent number
        percentage: -1
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

        deleteItem: function(type,id){

            // id= 3
            //you don't want to choose based on the index within array but based on the content of the id 
            //data.allItems[type][id];
            //id = [1 2 4 6 8]
            //index = 3;

            //difference between map and forEach is that map returns a whole new array
            //returns an array with all id of inc or exp from the object...
            const ids = data.allItems[type].map(function(currentElement){
                return currentElement.id;
            });

            //this will find the index of id within the array that match with the id that we pass through "indexOf"
            index = ids.indexOf(id);

            if (index !== -1){
                //start at the index and remove 1
                data.allItems[type].splice(index,1);
            }


        },

        calculateBudget: function(){

            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            //to avoid infinity 
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
            } else{
                data.percentage = -1;
            }
   
        },

        calculatePercentages: function(){

            data.allItems.exp.forEach(function(currentElement){
                currentElement.calcPercentage();
            })

        },
        //method for only returning data  - having function that only retrieve data or set data 
        getBudget: function(){
            //object is good for returning multiple data
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testing: function(){
            return data;
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    };

    //return so info get made available to public
    return{
        //method
        //queryselector all in one place 
        getInput: function(){
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
                `<div class="item clearfix" id="inc-%id%">
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
                `<div class="item clearfix" id="exp-%id%">
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

        deleteListItem: function(selectorID){
            //we can only remove a child
            // document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID))
            const element = document.getElementById(selectorID) ;
            //remove the ID that you chose
            element.parentNode.removeChild(element)
        },

        clearFields: function(){
            let fields, fieldsArr;
            //hold the results of the selection
            //not an array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue );
          
            //slice function from browser is always attached to an array
            //so you are calling that function and use it on fields (a nodelist) and then this will return an array, which we can use 
            fieldsArr = Array.prototype.slice.call(fields);


            //anonymous function inside is a callback function
            fieldsArr.forEach(function(currentElement){
                currentElement.value = "";
            });

            fieldsArr[0].focus();

        },

        displayBudget: function(obj){

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }


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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    //every function has a specific task
    const updateBudget = function(){
        //5. calculate the budget
        budgetCtrl.calculateBudget();
        //6. return the budget 
        const budget = budgetCtrl.getBudget();
        //7. display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    const updatePercentages = function(){

        //1. calculate percentages 

        //2. read percentages from the budget controller

        //3. update the UI with the new percentages 

    };

    const ctrlAddItem = function(){
        let input, newItem;
        //1. get the field input data
        input = UICtrl.getInput();
     
        //if description is not empty and if input.value is not "not a number"
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //2. add the item to the budget controller
            //it returns an object
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            
            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            //4. clear the fields 
            UICtrl.clearFields();

            //5. calculate and update budget

            updateBudget();

            //6. calculate and update percentages
            updatePercentages();

        }
    };

    //target returns html node in dom
    //target is just anything our mouse clicks 
    const ctrlDeleteItem = function(event){
        let itemID, splitID, type, ID;

        //bc the button is the parentnode of the icon x that you are pressing?
        //then you move all the way up to the actual id that you care about to delete 
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){

            //javascript puts a wrapper around the string, which is a primitive, and then change the string into an object and with the object you get a host of string helpers, from the prototypew
            //splitId returns an array with the split component 
            splitID = itemID.split('-');
            type = splitID[0];
            //change string from the split to an actual number to use in the index
            ID = parseInt(splitID[1]);

            //1. delete item from data structure
            budgetCtrl.deleteItem(type,ID);

            //2. delete the item from the ui
            UICtrl.deleteListItem(itemID);
            //3. update and show the new budget 
            updateBudget();
        }

    };

    return {
        //public initization function to call the setupEventListeners - needed to call the eventlisteners
        //return from this function in order for the init to be public
        init: function(){
            //you run this function first before everything else in order to make the income budget etc to be 0....
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            console.log('Application has started.');
            setupEventListeners();
        }
    }
    

})(budgetController, UIController);
//budgetcontroller and uicontroller are passed into this function

//you need to do this in order for init ("setupEventListeners()" and probably other functions) to run function
controller.init();