/*
  In javascript, we can create object literals using brackets {}
  White space and newlines are irrelevant, so we can space out the
    code to be more readable.
*/

var dog = {
  breed: "Shiba Inu",
  name: "Jimmothy"
};
//the object itself can be logged
console.log(dog);
//the properties can also be logged
console.log(dog.breed);
console.log(dog.name);

console.log("------------------------------------------------------") //Line break

/*
  Object literals can be created with methods as well. This is done
    by assigning a property to a function definition
*/

var cat = {
  color: "Orange",
  name: "Frank",
  speak: function(){
    console.log("Meow");
  }
}
//the function assignment itself can be accessed
console.log(cat.speak);
//use () to call the method
cat.speak();

console.log("------------------------------------------------------") //Line break

/*
  Methods can access object properties using the "this" keyword
*/

var parrot = {
  name: "George",
  speak: function(){
    console.log("Hello, my name is " + this.name);
  }
}
parrot.speak();

console.log("------------------------------------------------------") //Line break

/*
  Properties and methods can be added to objects, and object properties can be
    edited directly
*/
dog.breed = "Samoyed";
dog.speak = function(){
  console.log("Bork");
}
console.log(dog.breed);
dog.speak();

console.log("------------------------------------------------------") //Line break

/*
  Based on this knowledge, we can use Javscript functions to construct
    and return and object. This is called a factory function. Some people argue that
    this is the correct way to create objects; not classes. Another page will look into
    this more deeply.
*/

function makeAnimal(){
  //create an animal
  var animal = {};
  animal.name = "name";
  animal.age = "age";
  animal.speak = function(){
    console.log("Hello, my name is "+ this.name);
  }
  //return the animal object
  return animal;
}

//assign a variable to be an object produced by the makeAnimal function
var dolphin = makeAnimal();
console.log(dolphin.name);
dolphin.speak();

//the object "animal" is local to the makeAnimal function, so doing this will not work
//animal.speak(); /*produces error*/

console.log("------------------------------------------------------") //Line break

/*
  Functions can also take parameters to construct different objects. This is called a factory function.
*/

function makePerson(name, age){
  var person = {};
  person.name = name;
  person.age = age;
  person.speak = function(){
    console.log("Hello, my name is " + this.name);
  }
  return person;
}

var adam = makePerson("Adam", 17);
var shoop = makePerson("Shilpa", 17);
adam.speak();
shoop.speak();
console.log("------------------------------------------------------") //Line break

/*
  Classes are more commonly done in a way more similar to Java. The object
    constructor is built into the class definition. By convention, the first
    letter should be capitalized. The constructor function does not have to return
    anything, the object will be obtained using the "new" keyword.

  Because there is nothing being returned, class properties cannot be assigned to a
    local object literal. Therefore, use the "this" keyword when assigning properties
    and methods.
*/

function Person(name, age){
  this.name = name;
  this.age = age;
  this.speak = function(){
    console.log("Hello, my name is " + this.name);
  }
}
//objects are initialized with the "new" keyword, the same as in Java
var jacob = new Person("Jacob", 17);
jacob.speak();

console.log("------------------------------------------------------") //Line break

/*
  In general, methods should not be defined within the constructor like they
    are in the example above. In this example, every time an object is created,
    the speak function is defined, and stored for that object. This is somewhat
    similar to private methods in Java.

  When logging the object itself, we can see that each has it's own version
    of an identical function.
*/
var aditya = new Person("Aditya",17);
console.log(jacob);
console.log(aditya);

console.log("------------------------------------------------------") //Line break

/*
  In most cases, proper practice is to use Javascript's "prototype" to add methods
    onto the class. All objects created will still have access to the method, and
    functionality will be identical, but performance is improved when initializing
    objects.

    When using prototype to add a method, instance variables can still be accessed
      using the "this" keyword.
*/

function Animal(name, age){
  this.name = name;
  this.age = age
}
Animal.prototype.speak = function(){
  console.log("Hello, my name is " + this.name);
}

var frog = new Animal("Fred", 27);
var fish = new Animal("Joe", 14);
frog.speak();
fish.speak();

console.log("------------------------------------------------------") //Line break

/*
  If we log the Animal objects created with the prototype constructor,
    we can see that the speak method is not stored as a literal on the object.
    This is also beneficial, because if we were to edit the speak method after the objects
    were initialized, Animal objects would be able to access the updated method,
    while Person objects would continue to use the method stored on their instance.
*/
console.log(frog);
console.log(fish);

console.log("------------------------------------------------------") //Line break

/*
  In newer versions of Javascript, we also have classes that are just like Classes
    in other languages. This allows us to use static, extend, and other stuff
    people might know from Java.

  Instance variables must be defined in the constructor method
*/

class ClassExample {
  constructor(){
    this.name = "test";
  }
  speak() {
    console.log("This is a test")
  }
}

var testClassExample = new ClassExample();
console.log(testClassExample.name)
testClassExample.speak();


console.log("------------------------------------------------------") //Line break

/*
  If we create another ClassExample object, we can see that this
    syntax behaves identically to the constructor syntax with regard to
    prototype. Instance variables are independant, but the methods are prototype.
*/


var testClassExample2 = new ClassExample();
console.log(testClassExample);
console.log(testClassExample2);

console.log("------------------------------------------------------") //Line break

/*
  Using this new syntax, we can demonstrate a more complex example. This class is
    going to demonstrate special forms of getting and setting in Javascript, as well
    as showing how instance variables can be read and mutated by other methods.
*/

class Robot {
  constructor(number, name, batteryCharge){
    this.number = number;
    this.name = name;
    this.batteryCharge = batteryCharge;
  }
  /*
    Getter:
      A method specified with the "get" keyword, that returns a value, can have
        that value accessed as if it were a property. That is, if the method name
        ( without ()) is called, it will return the return value, rather than the
        function literal.
  */
  get teamName(){
    return ("Team " + this.number.toString() + ": " + this.name)
  }
  /*
    The same can be accomplished with any other method, but when it is called, it
      must have () at the end, or it will return the function literal.
  */
  getTeamName(){
    return ("Team " + this.number.toString() + ": " + this.name)
  }
  /*
    Setter:
      Setting methods are like getters, but in the other direction. These
        are kind of weirder. With the set keyword, we can call the method as
        if accessing a property, and if we give parameters to the set method,
        we input them by assignment.
      Despite the name, we don't need to just set an instance variable to a
        parameter. The method can also do calculations, or increment the
        variable. Setter functions msut have exactly 1 argument.
  */
  set charge(amount){
    this.batteryCharge += amount;
  }
  //again, the same can be accomplished with other methods
  chargeBattery(amount){
    this.batteryCharge += amount;
  }
}
var bombSquad = new Robot(16, "Bomb Squad", 12);
//Instance variables
console.log(bombSquad.number);
console.log(bombSquad.name);
console.log(bombSquad.batteryCharge);
//Get keyword
console.log(bombSquad.teamName);
//Getter method (outputs the same thing)
console.log(bombSquad.getTeamName())

//Showing setting
bombSquad.charge = 3; //I find this counter intuitive, personally
console.log(bombSquad.batteryCharge);
bombSquad.chargeBattery(3);
console.log(bombSquad.batteryCharge);

/*
  This class syntax is nice, because all methods are shown neatly in the same place.
    Because it is relatively newer, code references will often show the older ways
    of creating object templates, generally the object constructor syntax. For our
    purposes, we will mostly use the class syntax, for familiarity.

    There is an ongoing debate as to if the class syntax is actually a good thing.
    It's familiar, but some say that this is a poor implementation to imitate Java.
*/

console.log("------------------------------------------------------") //Line break


var plus2 = val => val + 2;

var plus3 = val => val + 3;

var compose = (f, g) => x => f(g(x));


// var compose = function(f, g) {
//   //return a composed function
//   return function(x) {
//     return f(g(x));
//   };
// };

console.log(compose(plus2, plus3)(10));
// "15"
