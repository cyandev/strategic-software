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
    and return and object. Important: this is not generally how we will
    use classes and constructors, this is for better understanding objects
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
  Functions can also take parameters to construct different objects
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
