document.addEventListener('event:response',()=>{
    res.innerText = input.value;
    input.value = '';
})