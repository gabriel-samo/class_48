console.log('\n--------------------before---------------------\n')
let number = 10;
let string = "Hello";
let boolean = true;

console.log(`type of number(${number}): ${typeof number}`)
console.log(`type of string(${string}): ${typeof string}`)
console.log(`type of boolean(${boolean}): ${typeof boolean}`)

console.log('\n--------------------after---------------------\n')
number = String(number);
string = Boolean(string);
boolean = Number(boolean);

console.log(`type of number(${number}): ${typeof number}`)
console.log(`type of string(${string}): ${typeof string}`)
console.log(`type of boolean(${boolean}): ${typeof boolean}\n`)