const randomString = (givenLength) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = '';
  for (let i = 0; i < givenLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

console.log('\nword 1:', randomString(5));
console.log('word 2:', randomString(5));
console.log('word 3:', randomString(5));
console.log('word 4:', randomString(5));
console.log('word 5:', randomString(5));