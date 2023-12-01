var num = prompt('Please enter a number:');

if(num < 10){
  console.log('1 digit');
} else if (num < 100) {
  console.log('2 digits');
} else if (num < 1000) {
  console.log('3 digits');
} else {
  console.log('4 digits or more');
}