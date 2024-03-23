$.ajax({
    url: 'https://restcountries.com/v3.1/all/?fields=capital,flags,population',
    method: 'GET',
    success: (data) => {
        for (let i = 0; i < 10; i++) {
            let div = $('<div>').append($('<h3>').append(data[random(250)].capital));
            div.append($('<img>').attr('src', data[random(250)].flags.png));
            div.append($('<p>').append('Population: ', data[random(250)].population));
            $('body').append(div);
        }
        console.log(data[0]);
    }
})

function random(max=10){
    return Math.floor(Math.random() * max);
}
