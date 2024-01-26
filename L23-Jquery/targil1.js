$(document).ready(() => {
    let names = ["Aaran", "Aaren", "Aarez", "Aarman", 
    "Aaron","Ace", "Adain", "Adam", "Adam-James", "Addison",
    "Addisson", "Baillie", "Baley", "Balian", "Banan", "Barath",
    "Barkley", "Barney", "Baron", "Barrie", "Barry", "Bartlomiej", 
    "Bartosz", "Basher", "Basile", "Baxter", "Baye", "Bayley"];

    function random(max) {
        let randomNum = Math.floor(Math.random() * max);
        return randomNum;
    }
    
    for (let i = 0; i < $('li').length; i++){
        $('li').eq(i).html(names[random(names.length)]);
    }
})