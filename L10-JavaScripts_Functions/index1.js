// ****************Exersice-1***************************************
// wrtie a function that gets the number of digits of a integer:
function getDigits(num){
    let digits = 0;

    while(num > 0){
        digits++;
        num = parseInt(num/10);
    }
    
    return digits;
}

console.log(`Total digits: ${getDigits(123456789)}`);

// ****************Exersice-2***************************************
// write a function that get the highest value in an given array:
function getHighestValue(array){
    let high = array[0];
    
    for(let index = 1; index < array.length; index++){
        if(array[index] > high){
            high = array[index];
        }
    }

    return high;
}

array1=[68,46,63,4,100,31,99,56];

console.log(`The highest value in the array is: ${getHighestValue(array1)}`);

// ****************Exersice-3***************************************
// create a form that get a salary and calculate 10% and 20%:

const calc = document.getElementById('calc');

calc.addEventListener('click', () => {
    const salary = document.getElementById('salary').value;
    const result = document.getElementById('result');

    result.innerText = `Your salary is: ${salary}
    Maaser is: ${maaser(salary)}
    Homesh is: ${homesh(salary)}`
})

const maaser = (salary) => {
    return salary*0.1;
}
const homesh = (salary) => {
    return salary*0.2;
}

