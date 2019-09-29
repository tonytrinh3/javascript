/////////////////////////////////
// Lecture: Classes

/*
//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');

//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    
    calculateAge() {
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
    
    static greeting() {
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');

Person6.greeting();
*/




/////////////////////////////////
// Lecture: Classes and subclasses

/*
//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
>>>>>>> e62d548423e8259604fc29305bbf84bf67ea4777
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

<<<<<<< HEAD
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
=======
var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);


Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}


var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();


//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
*/

//ES5
//super class
var Person5 = function(name, yearOfBirth,job){
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person5.prototype.calculateAge = function(){
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log('Calculated Age of: ' + age);
};

var john5 = new Person5('John',1995,'builder');


//subclass
var Athlete5 = function(name, yearOfBirth,job, olympicGames, medals){
  //the reason i think you use call is to avoid retyping the same properties that you would type for Person5 within Athlete5
  //very important you need to write this to refer all the input properties into person5 back to person5 for athlete5 to use
  Person5.call(this,name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
};

//you do this in order for the Athlete5 to have the same prototype as Person5 so you can use the methods that Person5 has
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedals = function(){
  this.medals++;
  console.log('Medals won: ' + this.medals);
}

var johnny5 = new Athlete5('John',1995, 'jumper',2,3);
johnny5.calculateAge();
johnny5.wonMedals();

//es6

class Person6 {
  constructor(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }
  
  calculateAge(){
    const age = new Date().getFullYear() - this.yearOfBirth;
    console.log(`Calculated Age of: ${age}`);
  }
}

const john6 = new Person6("John",1920,'teacher');
john6.calculateAge();


class Athlete6 extends Person6{
  constructor(name, yearOfBirth, job, olympicGames, medals){
    //calls the super class Person6 and state which properties to pass through to the Athlete6
    //athlete6 will also get the prototype from person6
    super(name, yearOfBirth, job)
    this.olympicGames = olympicGames;
    this.medals = medals;
  }
  
  wonMedals(){
    this.medals++;
    console.log(`Medals won: ${this.medals}`);
  }
}

const johnny6 = new Athlete6("Johnny", 1950, 'body builder',3 ,6);
console.log(johnny6);
johnny6.calculateAge();
johnny6.wonMedals();

class Something extends React.Component{
  render(){
    return (
      <div>
      
      </div>)
  }
}

>>>>>>> e62d548423e8259604fc29305bbf84bf67ea4777
