/*
  A factory function is any function that returns an object without using
    the "new" keyword. This is possible in Javascript because of object literals.
    The object inside the factory can have properties assigned with parameters,
    and can have function literals as properties.
*/

function createPerson(name, age){
  let obj = {};
  obj.name = name;
  obj.age = age;
  obj.introduce = function(){
    console.log("Hello, my name is " + obj.name + ", I am " + obj.age);
  };
  obj.setName = function(newName){
    console.log("Setting " + obj.name + " to " + newName);
    obj.name = newName;
  }
  return obj;
}

let person1 = createPerson("Jim", 23);
let person2 = createPerson("Bob", 44);
person1.introduce();
person2.introduce();
person1.setName("Jimmothy");
person1.introduce();

console.log("------------------------------------------------------") //Line break

/*
  Clearly, this works. It isn't really more clear or more concise than the class
    syntax though, so why use it? Googling the question will turn up what appears
    to be an ongoing internet war, but from my research, the general consensus is that
    factory functions are more powerful, and more secure.

  Also, because they are functions, we can use them to demonstrate arrow functions.
    Arrow functions are a new form of anonymous (unnamed) function. We could see them
    for example, after callbacks
*/

function doThing(callback){
  console.log("do thing");
  callback();
}

doThing(function(){ //this is the callback that gets called at the end of doThing
  console.log("do callback");
})

console.log("------------------------------------------------------") //Line break

/*
  To do the same in arrow notation would look like this
*/

doThing( () => console.log("do arrow callback"))

console.log("------------------------------------------------------") //Line break

/*
  Everything on one line! Let's break down what's happening here. The anonymous
    function takes no parameters, shown by (). These no parameters are then passed
    to the anonymous function, to do something, with =>, in this case, just logging
    something to the console.

  Arrow functions can have multiple lines too, we just need to define a function
    body with {}
*/

doThing(() => {
  console.log("Line 1");
  console.log("line 2");
})

console.log("------------------------------------------------------") //Line break

/*
  Callbacks can also take parameters, but first we'll have to write a function that
    passes parameters into the callback
*/

function doParams(callback){
  console.log("Did a thing and passed params");
  callback("Some parameters")
}

doParams((params) => console.log(params));

console.log("------------------------------------------------------") //Line break

/*
  Now, anonymous functions can't be named, but because functions are just objects
    in Javascript, you could just assign them to a variable. We're going to use
    const here, because there isn't any need to change the inside of a function after
    it's written
*/

const sayHello = function(){
  console.log("hello")
}

//and now to run the function
sayHello();

console.log("------------------------------------------------------") //Line break

//this variable can be passed as a callback just any named function would be
doThing(sayHello);

console.log("------------------------------------------------------") //Line break

/*
  Arrow functions can be used the same way
*/

const saySomethingElse = () => console.log("Something else");
saySomethingElse();

console.log("------------------------------------------------------") //Line break

/*
  Implicit returns:
    Arrow notation allows for functions to return something implicitly. If
      the function consists of just one object (string, number, array, or any defined object)
      that object will be returned
*/

const sum = (a, b) => a + b; //returns the sum of a and b
console.log(sum(3,7));

/*
  This is where things start getting weird, and also cool. You can implicitly return
    object literals {}, but you need to wrap them in (), so that Javascript doesn't read
    it as the function body. This allows you to make factory functions with arrow notation.
*/

const arrowFactory = (param) => ({
  name: param
});

let arrow = arrowFactory("George the arrow");
console.log(arrow.name)

console.log("------------------------------------------------------") //Line break

/*
  You can also use arrow functions in object methods, but you shouldn't, because
    they don't have their own "this." On the other hand, some people will say
    that you should do this, and instead just don't use "this." Doing it that way
    would allow you to have truly private instance variables.
*/

const createAnimal = (name, sound) => ({
  name, //naming the variable the same as the parameter works, now there is no need for assignment
  sound,
  speak: () => console.log(name + ": " + sound) //Try replacing name and sound with this.name and this.sound
  //
});
let cow = createAnimal("Cow", "Moo");
cow.speak();

//Better to use regular function definition in this case

const createAnimal2 = (name, sound) => ({
  name,
  sound,
  speak(){
    console.log(this.name + ": " + this.sound); //this can be removed here, in simple examples it doesn't matter.
  }
});
let sheep = createAnimal2("Sheep", "Baa");
sheep.speak();


console.log("------------------------------------------------------") //Line break

/*
  Doing everything with arrow functions, including methods, in order to eliminate
    the use of the this keyword
*/

const createAnimal3 = (name, sound) => {
  //name and sound are stored
  let type = "Animal" //If we wanted something to be the same for all animals, we can define it here
  return {
    sound, //let's allow sound to be public, to see what happens
    getName: () => name,
    setName: (newName) => name = newName,
    speak: () => console.log(name + ": " + sound),
    getType: () => type
  }
}
let fish = createAnimal3("Fish", "Blub");
fish.speak();
console.log(fish.name);
console.log(fish.getName());
console.log(fish.sound);
console.log(fish.setName("Whale")); //note how this returns the new name due to implicit returns
fish.speak();

console.log("------------------------------------------------------") //Line break

/*
  To prove that this is actually a factory, let's create a seperate object
*/
let duck = createAnimal3("Duck", "Quack");
duck.speak(); //Duck: Quack
//but did it replace any of fish's variables?
fish.speak(); //Whale: Blub

console.log(duck.type) //undefined
console.log(fish.getType()) //Animal
console.log(duck.getType()) //Animal

console.log("------------------------------------------------------") //Line break
/*
  And let's also log the objects themselves. Only sound is shown because it was passed
    through to the object. (And of course the methods are there too)
*/
console.log(fish);
console.log(duck);
