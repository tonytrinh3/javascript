//es5

var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John',1990, 'teacher');

john5.calculateAge();


//ES6

class Person6 {
    constructor(name, yearOfBirth, job){
        this.name = name;
        this.yearOfBirth=yearOfBirth;
        this.job=job;
    }
    //so for method you just type like a regular function 
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
    }
}

const john6 = new Person6('John',1990, 'teacher');