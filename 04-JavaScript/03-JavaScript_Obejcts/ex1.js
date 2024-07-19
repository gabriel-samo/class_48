const student1 = {
    name: 'Moshe',
    classNumber: 46,
    grades: [94, 65, 84, 73, 88],
    gradesAvg: function (){
        let avg = 0;
        for (let count = 0; count < this.grades.length; count++) {
            avg += this.grades[count];
        }
        return avg /= this.grades.length;
    },
}

const student2 = {
    name: 'Avi',
    classNumber: 46,
    grades: [66, 48, 75, 65, 87],
    gradesAvg: () => {
        let avg = 0;
        for (let count = 0; count < student2.grades.length; count++) {
            avg += student2.grades[count];
        }
        return avg /= student2.grades.length;
    },
}

const student3 = {
    name: 'Motti',
    classNumber: 46,
    grades: [33, 48, 68, 79, 94],
    gradesAvg: () => {
        let avg = 0;
        for (let count = 0; count < student3.grades.length; count++) {
            avg += student3.grades[count];
        }
        return avg /= student3.grades.length;
    },
}