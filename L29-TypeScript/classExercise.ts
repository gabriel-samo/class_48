class Person{
    private personName:String;
    private personAge:number;

    constructor(personName:String, personAge:number){
        this.personName = personName;
        this.personAge = personAge;
    }

    public showNameAge():String{
        let thisYear:number = new Date().getFullYear();
        let bornIn:number = thisYear - this.personAge;
        return `${this.personName} was born in ${bornIn}`;
    }
}

let newPerson = new Person('moshiko',30);
console.log(newPerson.showNameAge());