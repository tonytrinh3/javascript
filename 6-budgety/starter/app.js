const budgetController = (function(){

}
    
)();

const UIController = (function(){

})();

//you want function based input in order for the function to be more indepepdent and modular
const controller = (function(budgetCtrl, UICtrl){
    document.querySelector('.add__btn').addEventListener('click',function(){
        console.log('Button was clicked.');
    });

    document.addEventListener('keypress', function(event){
        //event.which is for older browser
        if (event.keyCode === 13 || event.which === 13){
            console.log("Enter was pressed");
        }
    })

})(budgetController, UIController);