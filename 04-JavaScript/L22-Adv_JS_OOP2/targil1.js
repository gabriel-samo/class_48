class Shape {
    // C'tor
    constructor(x, y, color) {
        this.setX = x;
        this.setY = y;
        this.setColor = color;
    }

    //Setters
    set setX(x) {
        this.x = x;
    }

    set setY(y) {
        this.y = y;
    }

    set setColor(color) {
        this.color = color;
    }

    // Getters
    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }

    get getColor() {
        return this.color;
    }

    // Methods
    distanceFromOrigin() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    toString() {
        return `X = ${this.x}, Y = ${this.y}, Color = ${this.color}`;
    }
}

let shape1 = new Shape(5,6, 'White');
let shape2 = new Shape(8,3,'Black');
let shape3 = new Shape(3,7,'Purple');

console.log(shape1.toString());
console.log('Distance from origin:',shape1.distanceFromOrigin());
console.log('==============================');
console.log(shape2.toString());
console.log('Distance from origin:',shape2.distanceFromOrigin());
console.log('==============================');
console.log(shape3.toString());
console.log('Distance from origin:',shape3.distanceFromOrigin());
console.log('==============================');

