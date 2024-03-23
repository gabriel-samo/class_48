class Salary {
    constructor(name, salary){
        this.name = name;
        this.salary = salary;
    }

    maaser(){
        console.log(`The Maaser of ${this.name}'s salary is: ${this.salary * 0.1}`);
    }

    calculateVat(){
        console.log(`The Salary of ${this.name} after VAT is: ${this.salary*0.75}`);
    }

    showName(){
        console.log(`The name of the worker is: ${this.name}`);
    }

    showSalary(){
        console.log(`The salary of the worker is: ${this.salary}`);
    }
}

const shlomo = new Salary('Shlomo', 15500);
const yossi = new Salary('Yossi', 16700);
const itzik = new Salary('Itzik', 22300);

shlomo.showName();
shlomo.showSalary();
shlomo.maaser();
shlomo.calculateVat();
console.log('==========================================');

yossi.showName();
yossi.showSalary();
yossi.maaser();
yossi.calculateVat();
console.log('==========================================');

itzik.showName();
itzik.showSalary();
itzik.maaser();
itzik.calculateVat();