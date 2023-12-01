var max = prompt('Plese enter MAX number');
var den = prompt('Plese enter DEN number');
var num = 2;

while(num<=max){
  if(num%den==0){
    console.log(`${num} is divided by ${den}`);
  }
  num++;
}