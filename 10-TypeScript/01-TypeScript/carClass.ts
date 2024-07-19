class Car {
    //fields
    private carNumber: String | number;
    private manufacturer: String;
    private model: String;
    private color: String;
    private year: number;
    private engine: String | number;
    private speed: number;

    //constructor
    constructor(carNumber: String | number, manufacturer: String, model: String, color: String, year: number, engine: String | number) {
        this.carNumber = carNumber;
        this.manufacturer = manufacturer;
        this.model = model;
        this.color = color;
        this.year = year;
        this.engine = engine;
        this.speed = 0;
    }

    // getters
    getCarNumber(): String | number{
        return this.carNumber;
    }

    getManufacturer(): String {
        return this.manufacturer
    }

    getModel(): String {
        return this.model;
    }

    getColor(): String {
        return this.color;
    }

    getYear(): number {
        return this.year;
    }

    getEngine(): String | number {
        return this.engine;
    }

    getSpeed(): number {
        return this.speed;
    }

    //setters
    setCarNumber(newNumber: String): void {
        this.carNumber = newNumber;
    }

    setManufacturer(newManufacturer: String): void {
        this.manufacturer = newManufacturer;
    }

    setModel(newModel: String): void {
        this.model = newModel;
    }

    setColor(newColor: String): void {
        this.color = newColor;
    }

    setYear(newYear: number): void {
        this.year = newYear;
    }

    setEngine(newEngine: number): void {
        this.engine = newEngine;
    }

    setSpeed(newSpeed: number): void {
        this.speed = newSpeed;
    }

    //methods
    public print(): String {
        return `\nCar Detailes:\nCar Number: ${this.getCarNumber()}\nCar Manufacturer: ${this.getManufacturer()}
Car Model: ${this.getModel()}\nCar Color: ${this.getColor()}\nCar Year: ${this.getYear()}\nCar Engine: ${this.getEngine()}\nCar Speed: ${this.getSpeed()}\n`;
    }

    public speedUp():String{
        this.setSpeed(230)
        return `The car was sped up to: ${this.getSpeed()}`;
    }

    public speedDown():String{
        this.setSpeed(130)
        return `The car was sped down to: ${this.getSpeed()}`;
    }

    public stopCar():String{
        this.setSpeed(0)
        return `The car stopped, current speed: ${this.getSpeed()}`;
    }
}

let kia = new Car('123456', 'Kia', 'Sportage', 'White', 2015, 1600);
console.log(kia.print());
console.log(kia.speedUp());
console.log(kia.speedDown());
console.log(kia.stopCar());