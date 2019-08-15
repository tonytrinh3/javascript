// let obj1 = {
//     name: "john",
//     age: 26
// };

// let obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);

// let age = 27;
// let obj = {
//     name: 'Jonas',
//     city: 'Lisbon'
// };


// function change(a,b){
//     a = 30;
//     b.city = 'san francisco';
// }

// change(age,obj);

// console.log(age);
// console.log(obj.city);

//alert input into a function 





// const somethingAnswer = ['John','Michael','Jonas'];
// let something1 = {
//     question: "What is the name of this course's teacher?"
// }
// let something2 = {
//     question: "Who Am i?",
//     answer: "Jonas"
// }
// let something3 = {
//     question: "how am i?",
//     answer: "Jonas"
// }

// const question = function(){
//     console.log(something1.question)
//     for(i=0;i < somethingAnswer.length; i++){
//         console.log(i + ": " + somethingAnswer[i]);
//     }    
// };
// question();

// let userInput = prompt("Please answer the right answer");

// console.log(userInput);

// const answer = function(input){
//     if(input === somethingAnswer[2]){
//         console.log("Correct!")
//     } else{
//         console.log("Wrong!") 
//     }
// };

// answer(userInput);

//function constructor
//blueprint to correct many types of objects
//function contructors have to be capital letter
//put the input in the this variable - need to go back to the lesson
//"this" is used in order to point the function inputs to the empty object that is created and not to the global object
function Question(question,answers,correct){
    this.question = question;
    this.answer=answers;
    this.correct=correct;

}

//displayQuestion is a method - it is a function that can be triggered
//displayQuestion is then attached to Question as a method ("function")
Question.prototype.displayQuestion = function(){
    console.log(this.question);
    for(i=0;i < this.answer.length; i++){
        console.log(i + ": " + this.answer[i]);
    }  
}

//new question - new empty object and then you feed the object with data and that is stored in memory
var q1 = new Question ('Is Javascript the coolest programmign language in the world?', ['Yes','No'],0);
var q2 = new Question('What is the name of this course\'s teacher?', ['John', 'Michael','Jonas'],2);
var q3 = new Question('What best describes coding?', ['Boring', 'Hard','Fun','Tedious'],2);



const questions = [q1,q2,q3];

const n = Math.floor(Math.random() * questions.length);


// let john = {
//     name: "hi me",
//     displayMe: function(){
//         console.log(this.name)
//     }
// }

// john.displayMe();

//you really only care about this method being triggered 
questions[n].displayQuestion();
