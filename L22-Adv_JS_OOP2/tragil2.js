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

class Circle extends Shape {

    // Static Properties
    static PI = 3.14;

    // C'tor
    constructor(x, y, color, radius) {
        super(x, y, color);
        this.setRadius = radius;
    }

    // Setters
    set setRadius(radius){
        this.radius = radius;
    }

    // Getters
    get getRadius(){
        return this.radius;
    }

    // Methods
    toString() {
        return `${super.toString()}, Radius = ${this.radius}`;
    }

    getArea() {
        return Circle.PI * (this.radius * this.radius);
    }

    getPerimeter() {
        return 2 * Circle.PI * this.radius;
    }
}

const circle1 = new Circle(5, 6, 'Puple', 3);

console.log(circle1.toString());
console.log('Distance from origin:', circle1.distanceFromOrigin());
console.log('Area is:', circle1.getArea());
console.log('Perimeter is:', circle1.getPerimeter());
console.log('PI is:', Circle.PI);