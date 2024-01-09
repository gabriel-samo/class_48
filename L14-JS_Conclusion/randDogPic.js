let imgElm = document.getElementById('dogPic');
let dogPicEndpoint = 'https://random.dog/woof.json';

const imgChange = setInterval(async ()=> {
    const getPicture = await fetch(dogPicEndpoint);
    const parsePic = await getPicture.json();
    if(String(parsePic.url).endsWith('.mp4')){
        // console.log(String(parsePic.url));
        return;
    } 
    imgElm.src=parsePic.url;
},2500)