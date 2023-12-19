const div = document.getElementById("revMe");

function revMe(){
    const userText = document.getElementById("myText").value;
    let result ='';
    for(let i=userText.length-1; i>=0; i--){
        result+=userText[i];
        console.log(result);
    }
    div.innerText=result;
}

document.getElementById("myText").addEventListener('keyup',revMe);
