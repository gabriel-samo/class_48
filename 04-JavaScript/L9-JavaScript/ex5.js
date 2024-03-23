var nums=[1,2,3,4,5,6,7,8,9,10];
var odds=[];
var evens=[];
var odd=0;
var even=0;

for(var index=0;index<nums.length;index++){
  if(nums[index]%2==0){
    // console.log(nums[index],'is even');
    evens.push(nums[index]);
    even++;
  } else {
    // console.log(nums[index],'is odd');
    odds.push(nums[index]);
    odd++;
  }
}
console.log('there is',even,'even numbers in the array');
console.log(evens);
console.log('there is',odd,'odd numbers in the array');
console.log(odds);