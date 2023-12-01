var grades = [0,0,0,0,0];

for(var i=0;i<grades.length;i++){
  grades[i] = Number(prompt(`Please enter a grade ${i+1}`));
}

var lowGrade=100;
var highGrade=0;
var avg=0;

for (var index=0;index<grades.length;index++){
    //look for the lowest grade
    if (grades[index]<lowGrade){
        lowGrade=grades[index];
    }
    //look for the highest grade
    if (grades[index]>highGrade){
        highGrade=grades[index];
    }
    //calculate the sum of all grades
    avg+=grades[index];
}
//caculate the avarge of grades
avg/=grades.length;

//
console.log("lowest grade:",lowGrade);
console.log("highest grade:",highGrade);
console.log("average:",avg);