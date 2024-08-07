// checking local storage if the array of coins exist then setting it to our array.
let cryptoCoins = JSON.parse(localStorage.getItem('cryptoCoins')) || new Array();
const url = "https://api.coingecko.com/api/v3/coins/list"

// todays date:
const now = new Date();
// last time coins updated in localStorage:
let lastUpdated = new Date(JSON.parse(localStorage.getItem('lastUpdated')));
// last updated + 24 hours (in milliseconds):
const oneDay = new Date(lastUpdated).getTime() + (24 * 60 * 60 * 1000);
// declaring a variable to store the setInterval id
let liveGraphInterval;

/* getting the data and saving to localStorage if 24 hours has passed since the last update
or localStorage don't have coins data. */
if (now.getTime() >= oneDay || !localStorage.getItem('cryptoCoins')) {
    $.get({
        url: url,
        beforeSend: () => {
            // before receiving the API call data, clearing the current data form the array and form localStorage:
            cryptoCoins.splice(0)
            localStorage.removeItem('cryptoCoins');
            // showing the loading animation
            // $(document).ajaxSend(() => {});
            $("#overlay").fadeIn(300);
        },
        complete: () => {
            // hiding the loading animation
            setTimeout(() => {
                $("#overlay").fadeOut(300);
            }, 500);
            homePage();
        },
        success: (result) => {
            for (let coin of result) {
                // adding a coin only if the first letter is not a number in id, symbol and name fields.
                if (Number.isNaN(parseInt(coin.symbol[0])) && Number.isNaN(parseInt(coin.id[0])) && Number.isNaN(parseInt(coin.name[0])) && coin.symbol.length === 3) {
                    cryptoCoins.push(coin);
                }
            }
            // saving to localStorage
            localStorage.setItem('cryptoCoins', JSON.stringify(cryptoCoins));
            // saving the time that last updated
            lastUpdated = new Date();
            localStorage.setItem('lastUpdated', JSON.stringify(lastUpdated));
        }
    })
} else homePage();
// } else aboutPage();

function homePage() {
    // injecting the clear all choices button
    $('#clearAllButton').html(`
        <button id="clearPickedCoins" class="btn btn-light col-auto mt-4" onclick=clearPickedCoins()>Clear All Picked Coins</button>
    `)
    // generating cards from the coins array.
    let cardsBody = '';
    for (let index = 0; index < cryptoCoins.length; index++) {
        cardsBody += `
        <div class="card border-light text-bg-dark col-md-4 col-xl-4 col-lg-4 col-sm-12" data-symbol="${cryptoCoins[index].symbol}">
            <div class="mx-3 mt-3 d-flex justify-content-between">
                <h5 class="card-title">${cryptoCoins[index].symbol.toUpperCase()}</h5>
                <div class="form-check form-switch">
                    <input id="${cryptoCoins[index].id}" class="form-check-input" type="checkbox" role="switch" ${cryptoCoins[index].picked ? 'checked' : ''}>
                </div>
            </div>
            <div class="card-body pt-0">
                <p class="card-text">${cryptoCoins[index].name}</p>
                <button id="button-${cryptoCoins[index].id}" class="btn btn-light moreInfoBtn" onclick=showMoreDetails('${cryptoCoins[index].id}')>More Details</button>
            </div>
        </div>
    `
    }
    // injecting coins cards to a div with body ID
    $('#body').html(cardsBody);
    pickingCoins();
    liveGraphInterval && clearInterval(liveGraphInterval);
}

// implementing Live Reports Page logic
function liveReportsPage() {
    $('#clearAllButton').html(``);
    $('#body').html(`
    <div id="liveOverlay">
        <div class="cv-spinner">
            <span class="spinner"></span>
        </div>
    </div>
    <div id="chartContainer" style="height: 370px; width: 100%; margin-top: 1rem; margin-bottom: 6rem;"></div>
    `);
    // declaring price points arrays dynamically depending on the pickedCoins array length 
    for (let index = 0; index < pickedCoins.length; index++) {
        eval(`var dataPoints${index + 1} = [];`)
    }
    // declaring "Options" Object
    var options = {
        title: {
            text: "Crypto Currency"
        },
        axisX: {
            title: "Chart updates every 2 seconds"
        },
        axisY: {
            suffix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: []
    };
    // array that depends on pickedCoins array length
    for (let index = 0; index < pickedCoins.length; index++) {
        let option = {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.000000$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: pickedCoins[index].toUpperCase(),
            dataPoints: eval(`dataPoints${index + 1}`)
        }
        options.data.push(option);
    }

    // generating the graph with the "options" object
    var chart = $("#chartContainer").CanvasJSChart(options);

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    // declaring an interval in milliseconds
    var updateInterval = 2 * 1000;

    // requesting for the initial value
    const yValueArray = [];
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${pickedCoins}&tsyms=USD`;
    $.getJSON({
        url: url,
        beforeSend: () => {
            $("#liveOverlay").fadeIn(300);
        },
        complete: () => {
            setTimeout(() => {
                $("#liveOverlay").fadeOut(300);
            }, updateInterval);
        },
        success: (response) => {
            for (let index = 0; index < pickedCoins.length; index++) {
                let coin = eval(`response.${pickedCoins[index].toUpperCase()}`)
                if (coin) {
                    yValueArray.push(coin.USD);
                } else {
                    yValueArray.push(0)
                }
            }
        }
    })

    // initial value
    for (let index = 0; index < pickedCoins.length; index++) {
        eval(`var yValue${index + 1} = yValueArray[${index}];`);
    }

    // starting at current time
    var time = new Date();

    // defining a function for updating the chart 
    function updateChart() {
        time.setTime(time.getTime() + updateInterval);
        $.getJSON({
            url: url,
            success: (response) => {
                for (let index = 0; index < pickedCoins.length; index++) {
                    let coin = eval(`response.${pickedCoins[index].toUpperCase()}`)
                    coin ? eval(`yValue${index + 1} = coin.USD;`) : eval(`yValue${index + 1} = 0`)
                }
            }
        })
        // pushing the new values
        for (let index = 0; index < pickedCoins.length; index++) {
            eval(`dataPoints${index + 1}.push({
                    x: time.getTime(),
                    y: yValue${index + 1}
                    });`);
        }

        // updating legend text with updated y Value
        for (let index = 0; index < pickedCoins.length; index++) {
            let price = eval('yValue' + (index + 1));
            eval(`options.data[${index}].legendText = "${pickedCoins[index].toUpperCase()} : ${price ? price + '$' : 'N/A'}";`)
        }
        $("#chartContainer").CanvasJSChart().render();
    }
    // generates first set of dataPoints 
    updateChart();
    liveGraphInterval = setInterval(function () {
        updateChart()
    }, updateInterval);
}


// implementing About Page logic
function aboutPage() {
    $('#clearAllButton').html(``);
    $('#body').html(`
        <h1 class="aboutMeHeader border-bottom">About Me</h1>
        <div class="row aboutMeBody">
            <div class="firstParagraph col-12 col-md-6">
                <i>"Those who work hard, work alone. <br/>
                Those who work smart, work as a team."</i> 
            </div>
            <div class="text-start col-12 col-md-6 mb-md-4 mb-0">
            <p>Hi! this project is about generating information about Crypto Currency through several API's. 
            In this project i used the knowledge we've learned through Fullstack Web Developer course at John Bryce Haifa.
            For styling i used Bootstrap library and native CSS, for the client side i used the JQurey library and vanila JavaScript.
            To save all the data gathered i used the browser built-in API Local Storage.</p>

            A little about me (as if someone cares...) my name is Gabriel Samoylov i am 30 years old an aspiring FullStack Web Developer.
            I am a creative problem solver and I enjoy working with complex coding challenges.
            I have a passion for developing high-quality software. I learn quickly and adapt to new technologies.
            I also have excellent communication and organizational skills, which help me to collaborate effectively with other team members.
            </div>
        </div>
        <div id="allMyInfo" class="row">
            <div class="col-1 col-md-2 col-lg-3"></div>
            <div id="imgDiv" class="text-end col-6 col-lg-3 col-md-4"><img id="myImg" class="img-thumbnail" src="images/GabrielSamo.jpg" alt="image of myself (Gabriel Samoylov)"/></div>
            <div id="myInfo" class="col-4 col-md-3 text-start"> 
                <div >Gabriel Samoylov</div>
                <div>Fullstack Web Developer</div>
                <div>(Aspiring one...)</div>
                <a class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://github.com/gabriel-samo/" target="_blank">Github Link</a>
            </div> 
        </div>
    `);
    liveGraphInterval && clearInterval(liveGraphInterval);
}

// implementing change page function that expects the specific button id, and a callback
function changePage(pageButtonId, pageFunction) {
    $(`#${pageButtonId}`).on('click', () => {
        pageFunction();
        let pageButtons = $('.nav-link');
        for (let index = 0; index < pageButtons.length; index++) {
            $(pageButtons[index]).removeClass('active');
        }
        $(`#${pageButtonId}`).addClass('active');
    })
}

// implementing logic for picking coins to show in the Live Reports page
const pickedCoins = JSON.parse(localStorage.getItem('pickedCoins')) || new Array();

function pickingCoins() {
    const allCards = $('.form-check-input');

    allCards.on('change', (card) => {
        const coinCard = card.target;
        const coinId = card.currentTarget.id;
        const coinName = coinCard.parentElement.parentElement.innerText.toLowerCase();

        if (!pickedCoins.includes(coinName)) {
            changePickedCoins(coinName, true, coinId);
            if (pickedCoins.length > 5) toggleModal(coinName, coinCard, coinId);
        } else {
            changePickedCoins(coinName, false, coinId);
        }
    })

    function changePickedCoins(coinName, add, coinId = '') {
        let deleteIndex = add ? '' : pickedCoins.indexOf(coinName);
        add ? pickedCoins.push(coinName) : pickedCoins.splice(deleteIndex, 1);
        let pickedCoin = cryptoCoins.find(coin => coin.id === coinId);
        add ? pickedCoin.picked = true : pickedCoin.picked = false;
        // saving to localStorage
        localStorage.setItem('cryptoCoins', JSON.stringify(cryptoCoins));
        localStorage.setItem('pickedCoins', JSON.stringify(pickedCoins));
    }

    function toggleModal(coinName, coinCard, coinId) {
        // removing coin if nothing was select
        let pickedCoin = cryptoCoins.find(coin => coin.id === coinId);
        pickedCoin.picked = false;
        pickedCoins.splice(pickedCoins.indexOf(coinName), 1);
        coinCard.checked = false;
        // saving to localStorage
        localStorage.setItem('cryptoCoins', JSON.stringify(cryptoCoins));
        localStorage.setItem('pickedCoins', JSON.stringify(pickedCoins));
        // Modal logic:
        const pickedCoinsModal = new bootstrap.Modal('#pickedCoinsModal');
        const modalToggle = document.getElementById('pickedCoinsModal');
        pickedCoinsModal.show(modalToggle);
        // Modal Title:
        $('#pickedCoinsModalLabel').text('Picked Coins');
        // Modal Body:
        let modalBody = '';
        for (let coin of cryptoCoins) {
            if (coin.picked) {
                modalBody += `
                    <div class="card border-light text-bg-dark col-md-4 col-xl-4 col-lg-4 col-sm-12">
                        <div class="mx-3 mt-3 d-flex justify-content-between">
                            <h5 class="card-title">${coin.symbol.toUpperCase()}</h5>
                            <div class="form-check form-switch">
                                <input id="${coin.id}" class="form-check-input" type="checkbox" role="switch" ${coin.picked ? 'checked' : ''}>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <p class="card-text">${coin.name}</p>
                        </div>
                    </div>
                `
            }
        }
        $('.modal-body').html(`
            <p>Please deselect one of the selected coins </p>
            <div class="row justify-content-center col-auto mt-4 mx-4">
                ${modalBody}
            </div>
        `)

        // implementing logic for switching coins
        $('.form-check-input').on('click', (modalCard) => {
            if (modalCard.target.checked === false) {
                let removedCoin = modalCard.target.parentElement.parentElement.innerText.toLowerCase();
                let removedCoinId = modalCard.currentTarget.id;
                changePickedCoins(removedCoin, false, removedCoinId);
                changePickedCoins(coinName, true, coinId);
                coinCard.checked = true;
                $(`#${removedCoinId}`)[0].checked = false;
                pickedCoinsModal.hide(modalToggle);
            }
        })
    }
}

// implementing logic for clear all picked coins
function clearPickedCoins() {
    pickedCoins.splice(0);
    localStorage.removeItem('pickedCoins');
    for (let index = 0; index < cryptoCoins.length; index++) {
        if (cryptoCoins[index].picked) cryptoCoins[index].picked = false;
    }
    localStorage.setItem('cryptoCoins', JSON.stringify(cryptoCoins));
    homePage();
}

// implementing search button logic 
$('#searchBtn').on('click', (event) => {
    event.preventDefault();
    let searchValue = $('#searchValue').val().toLowerCase();
    $('#searchValue').val('');
    if (!searchValue) {
        $('#searchValue').css({
            'border': '1px red solid',
            'background-color': 'rgba(255,0,0,0.1)'
        }).attr('placeholder', 'Cannot be empty');
        return;
    }
    const results = [];
    cryptoCoins.find(coin => {
        coin.symbol === searchValue && results.push(coin);
    })

    $('.nav-link').removeClass('active');
    if (results.length > 0) {
        let searchResult = '';
        for (let result of results) {
            searchResult += `
            <div class="card border-light text-bg-dark col-md-4 col-xl-4 col-lg-4 col-sm-12" data-symbol="${result.symbol}">
            <div class="mx-3 mt-3 d-flex justify-content-between">
                <h5 class="card-title">${result.symbol.toUpperCase()}</h5>
                <div class="form-check form-switch">
                    <input id="${result.id}" class="form-check-input" type="checkbox" role="switch" ${result.picked ? 'checked' : ''}>
                </div>
            </div>
            <div class="card-body pt-0">
                <p class="card-text">${result.name}</p>
                <button id="button-${result.id}" class="btn btn-light moreInfoBtn" onclick=showMoreDetails('${result.id}')>More Details</button>
            </div>
        </div>`
            $('#body').html(`${searchResult}
            <p class="mt-3">press 'Home' button to show all the coins again</p>`);
            pickingCoins();
        }
    } else {
        $('#body').html(`
            <p>Not Found</p>
            <p>press 'Home' button to show all the coins again or search for another coin</p>
        `)
    }
})

$('#searchValue').on('keyup', () => {
    $('#searchValue').css({
        'border': '',
        'background-color': ''
    }).attr('placeholder', 'Search');
})

// implementing open "More Detail" modal
function showMoreDetails(coinId) {
    const moreInfoModal = new bootstrap.Modal('#moreInfoModal');
    const modalToggle = document.getElementById('moreInfoModal');
    const symbol = $(`#button-${coinId}`).parent().parent().data('symbol');
    $('#moreInfoModalLabel').text(symbol.toUpperCase());
    modalBody(coinId);
    moreInfoModal.show(modalToggle);
}

const savedCoinsDetails = JSON.parse(localStorage.getItem('savedCoinsDetails')) || new Array();

function modalBody(coinId) {
    const coin = cryptoCoins.find(coin => coin.id === coinId);
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    let thisCoin = savedCoinsDetails.find(coinObj => coinObj.id === coinId);
    if (!thisCoin) {
        $.get({
            url: url,
            beforeSend: () => {
                $('.modal-body').html(`
                    <div id="modalOverlay">
                        <div class="cv-spinner">
                            <span class="spinner"></span>
                        </div>
                    </div>
                `);
                $(document).ajaxSend(() => {
                    $("#modalOverlay").fadeIn(300);
                });
            },
            complete: () => {
                setTimeout(() => {
                    $("#modalOverlay").fadeOut(300);
                    // injecting to the "More Details" modal body
                    injectModalBody(coinId);
                }, 300);
            },
            success: (result) => {
                // saving coin's "More Details" data inside an array
                savedCoinsDetails.push({
                    id: coin.id,
                    symbol: coin.symbol,
                    imgSrc: result.image.small, // image options: thumb , small , large
                    usd: result['market_data']['current_price'].usd,
                    eur: result['market_data']['current_price'].eur,
                    ils: result['market_data']['current_price'].ils,
                })
                // saving to the localStorage
                localStorage.setItem('savedCoinsDetails', JSON.stringify(savedCoinsDetails));
            }
        })
    } else {
        injectModalBody(coinId);
    }
}

function injectModalBody(coinId) {
    let thisCoin = savedCoinsDetails.find(coinObj => coinObj.id === coinId);
    $('.modal-body').html(`
        <p id="coinImage"><img src="${thisCoin.imgSrc}" alt="${thisCoin.symbol.toUpperCase()} coin image" /></p>
        <p id="coinPrices">
            <p>USD: ${thisCoin.usd ? thisCoin.usd + '$' : 'N/A'}</p>
            <p>EUR: ${thisCoin.eur ? thisCoin.eur + '€' : 'N/A'}</p>
            <p>ILS: ${thisCoin.ils ? thisCoin.ils + '₪' : 'N/A'}</p>
        </p>
    `)
}

// clearing saved coins details from the localStorage and array that stores the data every 2 minutes
setInterval(() => {
    localStorage.removeItem('savedCoinsDetails');
    savedCoinsDetails.splice(0);
}, 2 * 60 * 1000);

// calling change page function to each button in the navigation bar
changePage('homeButton', homePage);
changePage('liveButton', liveReportsPage);
changePage('aboutButton', aboutPage);