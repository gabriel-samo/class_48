let dogImg = document.getElementById('dogImg');
let foxImg = document.getElementById('foxImg');
let dogPicEndpoint = 'https://random.dog/woof.json';
let foxPicEndpoint = 'https://randomfox.ca/floof/';

class RandomPic{
    static randomDog(){
        setInterval(async ()=> {
            const getPicture = await fetch(dogPicEndpoint);
            const parsePic = await getPicture.json();
            if(String(parsePic.url).endsWith('.mp4')){
                return;
            } 
            dogImg.src=parsePic.url;
        },2500)
    }
    static randomFox(){
        setInterval(async ()=> {
            const getPicture = await fetch(foxPicEndpoint)
            const parsePic = await getPicture.json();
            if(String(parsePic.url).endsWith('.mp4')){
                return;
            } 
            foxImg.src=parsePic.image;
        },2500)
    }
}

RandomPic.randomDog();
RandomPic.randomFox();