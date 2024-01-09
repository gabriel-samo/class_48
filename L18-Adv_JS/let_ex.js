let num = 1;
console.log(`\n(Global scope) Num is: ${num}`);
{
    let num = 2;
    console.log(`\n(Sub-global scope) Num is: ${num}`);
    {
        let num = 3;
        console.log(`\n(Sub-sub-global scope) Num is: ${num}\n`);
    }
}