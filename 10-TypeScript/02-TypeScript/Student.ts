class Student {
    // fields
    private name!: String;
    private course!: String;
    private age!: number;
    private yearlyGrade!: number;

    public static listOfSubjects = ['Programming', 'Physics', 'History', 'Math'];
    private static numOfStudents: number = 0;
    private static sumOfGrades: number = 0;

    readonly minNameLen = 1;

    // constructor
    constructor(name: String, course: String, age: number, yearlyGrade: number) {
        this.setName = name;
        this.setCourse = course;
        this.setAge = age;
        this.setYearlyGrade = yearlyGrade;
        Student.numOfStudents++;
        Student.sumOfGrades+=this.yearlyGrade;
    }

    // setters
    public set setName(name: String) {
        if (name.length < this.minNameLen) {
            console.log('You cannot enter an empty name.');
            this.name = 'n/a';
            return;
        }
        this.name = name;
    }

    public set setCourse(course: String) {
        // const courses = new Set(Student.listOfSubjects);
        if (!Student.listOfSubjects.includes(course.toString())) {
            console.log('Enter a vaild course.');
            this.course = 'n/a';
            return;
        }
        this.course = course;
    }

    public set setAge(age: number) {
        if (age < 18 || age > 120){
            console.log('Please enter age between 18 - 120');
            this.age = 0;
            return;
        }
        this.age = age;
    }

    public set setYearlyGrade(yearlyGrade:number){
        if (yearlyGrade < 0 || yearlyGrade > 100){
            console.log('Please enter a valid grade, between 0 - 100');
            this.yearlyGrade = 0;
            return;
        }
        this.yearlyGrade = yearlyGrade;
    }

    // getters
    public static get getNumOfStudents():number{
        return Student.numOfStudents;
    }

    // methods
    public print():String{
        return `Name: ${this.name}, Course: ${this.course}, Age: ${this.age}, Yearly Grade: ${this.yearlyGrade}`;
    }

    public static gradeAvarage():number {
        return Student.sumOfGrades / Student.numOfStudents;
    }
}

let student1 = new Student('Haim', 'Programming', 19, 70);
let student2 = new Student('Shlomo', 'Physics', 23, 66);
let student3 = new Student('Tamir', 'History', 61, 81);
let student4 = new Student('Shimshon', 'Math', 43, 90);
let student5 = new Student('Kohava', 'Programming', 28, 76);

console.log(student1.print());
console.log(student2.print());
console.log(student3.print());
console.log(student4.print());
console.log(student5.print());

console.log('Number of Students:',Student.getNumOfStudents);
console.log('Grade Avarege of all the Students:',Student.gradeAvarage());