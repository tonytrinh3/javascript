///////////////////////////////////////
// Lecture: Hoisting


//hoisting
//in creation phase of execution context, which is, in this case, the global execution context 
//the fucntion declaration calculateAge is stored in the variable object and even before the code is executed 
// and this is why when we then enter the execution phase, the calculate age function is already available for us to use it 
// so we don't have to first declare the function and then use it, but we can also first use it like this and only later in our code declare it 

//**biggest thing from hoisting is that we can declare function declaration before we define the function itself */

// calculateAge(1965);

// function calculateAge (year){
//     console.log(2016-year);
// }

// // retirement(1956);

// //function expression, not function declaration so you cannot call it before you define it
// //hoisting with function only works with function declaration
// const retirement = function (year){
//     console(65 - (2016 - year));
// }

// //variables

// //hoisting works with variable - in creation phase of variable object - code is scanned for variable declarations and the variables are then set to undefined
// console.log(age); //state as undefined
// //javascript knows the variable exists first - set it undefined first 
// let age = 23;
// console.log(age);

// function foo(){
//     let age = 65;
//     console.log(age);
// }

// foo(); //will say 65
// console.log(age); // will say 23
// //age 23 is with the global execution context object 
// //age 65 is for the variable object of the execution context object of the foo function
// //so the age are 2 different variable 













///////////////////////////////////////
// Lecture: Scoping


// First scoping example

//hellohihey - scoping chain - this works bc of scoping chain - having access to each variable as it moves down 
// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         console.log(a + b + c);
//     }
// }




// Example to show the differece between execution stack and scope chain


var a = 'Hello!';
first();

function first() {
    console.log(b);
    var b = 'Hi!';
    console.log(b);
    second();

    function second() {
        var c = 'Hey!';
        third()
        // console.log(a + b + c );
        //you can't get d because third() isn't referenced within this function
        //console.log(a + b + c + d);
    }
}
//b and c arent global variables so they aren't defined for this function - they are only defined for the function first()
//the third function is in a different scope than the second function, so it cannot access c and b
function third() {
    var d = 'John';
    console.log(a + b + c + d);
}




///////////////////////////////////////
// Lecture: The this keyword









