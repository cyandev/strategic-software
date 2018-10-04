class Robot{
  constructor(name, number){
    this.name = name;
    this.number = number;
  }
  printName(){
    console.log("Team " + this.number.toString() + ": " + this.name);
  }
}
