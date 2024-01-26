class Animal{
    constructor(name, sound){
        this.name = name;
        this.sound = sound;
        this.isAlive = true;
    }

    // Getters
    get getName(){
        return this.name;
    }

    get getSound(){
        return this.sound;
    }

    get getAlive(){
        return this.isAlive;
    }

    //Setters
    set setName(newName){
        return this.name = newName; 
    }

    set setSound(newSound){
        return this.name = newSound;
    }

}

class Lion extends Animal{
    constructor(name, sound){
        super(name, sound);
    }

    eat(eatAnimal){
        return eatAnimal.isAlive = false;
    }
}

class Cow extends Animal{
    constructor(name, sound){
        super(name, sound);
    }
}

class Cat extends Animal{
    constructor(name, sound){
        super(name, sound);
    }

    drinkMilk(drinkCow){
        if(drinkCow.getAlive){
            return "Yammy, milk!";
        }
        return "The cow is dead:("
    }
}

class Mouse extends Animal{
    constructor(name, sound){
        super(name, sound);
    }
}

let lion = new Lion('Arie', 'ROAR');
let cow = new Cow('Para', 'MUH');
let cat = new Cat('Hatul', 'MEW');
let mouse = new Mouse('Achbar', 'Tzik-Tzik');

console.log(lion);
console.log(cow);
console.log(cat);
console.log(mouse);

console.log('before lion eats, the cat says:' , cat.drinkMilk(cow)); 
lion.eat(cow);

console.log('After lion eats, the cat says:', cat.drinkMilk(cow));