const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello from promise 1");
    }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello from promise 2");
    }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello from promise 3");
    }, 1000);
});

// using .then() and .catch()
promise1
    .then((result) => {
        console.log(`Using then/catch: ${result}`);
        return promise2;
    })
    .then((result) => {
        console.log(`Using then/catch: ${result}`);
        return promise3;
    })
    .then((result) => {
        console.log(`Using then/catch: ${result}`);
    })
    .catch((error) => {
        console.log(`Error (then/catch)!! ${error}`);
    })

// using async await
const multiPromiseCall = async () => {
    try {
        console.log(`Using async/await: ${await promise1}`);
        console.log(`Using async/await: ${await promise2}`);
        console.log(`Using async/await: ${await promise3}`);
    } catch (error) {
        console.log(`Error(async/await)!! ${error}`);
    }
}

multiPromiseCall();