// checking local storage if the array of coins exist then setting it to our array.
let cryptoCoins = JSON.parse(localStorage.getItem('cryptoCoins')) || new Array();
const url = "https://api.coingecko.com/api/v3/coins/list"

// todays date:
const now = new Date();
// last time coins updated in localStorage:
let lastUpdated = new Date(JSON.parse(localStorage.getItem('lastUpdated')));
// last updated + 24 hours (in milliseconds):
const oneDay = new Date(lastUpdated).getTime() + (24 * 60 * 60 * 1000);

/* getting the data and saving to localStorage if 24 hours has passed since the last update
or localStorage don't have coins data. */
if (now.getTime() >= oneDay || !localStorage.getItem('cryptoCoins')) {
    $.get({
        url: url,
        beforeSend: () => {
            $(document).ajaxSend(() => {
                $("#overlay").fadeIn(300);
            });
        },
        complete: () => {
            setTimeout(() => {
                $("#overlay").fadeOut(300);
            }, 500);
            homePage();
        },
        success: (result) => {
            for (let coin of result) {
                localStorage.removeItem('cryptoCoins');
                // adding a coin only if the first letter is not a number in id, symbol and name fileds and the symbol is 3 letters.
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

function homePage() {
    // injecting the clear all choices button
    $('#clearAllButton').html(`
        <button id="clearPickedCoins" class="btn btn-light col-auto mt-4" onclick="clearPickedCoins()">Clear All Picked Coins</button>
    `)
    // generating cards from the coins array.
    let cardsBody = '';
    for (let index = 0; index <= 100; index++) {
        cardsBody += `
        <div class="card border-light text-bg-dark col-md-4 col-xl-4 col-lg-4 col-sm-12">
            <div class="mx-3 mt-3 d-flex justify-content-between">
                <h5 class="card-title">${cryptoCoins[index].symbol.toUpperCase()}</h5>
                <div class="form-check form-switch">
                    <input id="${cryptoCoins[index].id}" class="form-check-input" type="checkbox" role="switch" ${cryptoCoins[index].picked ? 'checked' : ''}>
                </div>
            </div>
            <div class="card-body pt-0">
                <p class="card-text">${cryptoCoins[index].name}</p>
                <button class="btn btn-light moreInfoBtn">More Details</button>
            </div>
        </div>
    `
    }
    // injecting coins cards to a div with body ID
    $('#body').html(cardsBody);
    pickingCoins();
}

// implementing Live Reports Page logic
function liveReportsPage() {
    $('#clearAllButton').html(``);
    $('#body').html(`<div id="chartContainer" class="mb-4" style="height: 370px; width: 100%;"></div>`);
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
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: pickedCoins[index].toUpperCase(),
            dataPoints: eval(`dataPoints${index + 1}`)
        }
        options.data.push(option);
    }

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
    // requesting for the initial value
    const yValueArray = [];
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${pickedCoins}&tsyms=USD`;
    $.getJSON({
        url: url,
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

    var updateInterval = 2 * 1000;
    // initial value
    for (let index = 0; index < pickedCoins.length; index++) {
        eval(`var yValue${index + 1} = yValueArray[${index}];`);
    }

    // starting at current time
    var time = new Date();

    function updateChart(count) {
        count = count || 1;
        for (var i = 0; i < count; i++) {
            time.setTime(time.getTime() + updateInterval);
            $.getJSON({
                url: url,
                success: (response) => {
                    for (let index = 0; index < pickedCoins.length; index++) {
                        let coin = eval(`response.${pickedCoins[index].toUpperCase()}`)
                        if (coin) {
                            eval(`yValue${index + 1} = coin.USD;`)
                        } else {
                            eval(`yValue${index + 1} = 0`)
                        }
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
        }

        // updating legend text with updated y Value
        for (let index = 0; index < pickedCoins.length; index++) {
            eval(`options.data[${index}].legendText = "${pickedCoins[index].toUpperCase()} : ${eval('yValue' + (index + 1))}$";`)
        }
        $("#chartContainer").CanvasJSChart().render();
    }
    // generates first set of dataPoints 
    updateChart();
    setInterval(function () {
        updateChart()
    }, updateInterval);
}

// implementing About Page logic
function aboutPage() {
    $('#body').html(`<p>About me page</p>`);
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
        const coinName = card.target.parentElement.parentElement.children[0].innerText.toLowerCase();

        if (!pickedCoins.includes(coinName)) {
            changePickedCoins(coinName, true);
            if (pickedCoins.length > 5) toggleModal(coinName, coinCard);
        } else {
            changePickedCoins(coinName, false);
        }
    })

    function changePickedCoins(coinName, add) {
        let deleteIndex = add ? '' : pickedCoins.indexOf(coinName);
        add ? pickedCoins.push(coinName) : pickedCoins.splice(deleteIndex, 1);
        let pickedCoin = cryptoCoins.find(coin => coin.symbol === coinName);
        add ? pickedCoin.picked = true : pickedCoin.picked = false;
        // saving to localStorage
        localStorage.setItem('cryptoCoins', JSON.stringify(cryptoCoins));
        localStorage.setItem('pickedCoins', JSON.stringify(pickedCoins));
    }

    function toggleModal(coinName, coinCard) {
        // removing coin if nothing was select
        let pickedCoin = cryptoCoins.find(coin => coin.symbol === coinName);
        pickedCoin.picked = false;
        pickedCoins.splice(pickedCoins.indexOf(coinName), 1);
        coinCard.checked = false;
        // saving to localStorage
        localStorage.setItem('cryptoCoins', JSON.stringify(cryptoCoins));
        localStorage.setItem('pickedCoins', JSON.stringify(pickedCoins));
        // Modal logic
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
                changePickedCoins(removedCoin, false);
                changePickedCoins(coinName, true);
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
        if (coin.symbol === searchValue) results.push(coin);
    })

    if (results.length > 0) {
        $('.nav-link').removeClass('active');
        let searchResult = '';
        for (let result of results) {
            searchResult += `
                <div class="card border-light text-bg-dark col-md-4 col-xl-4 col-lg-4 col-sm-12">
                    <div class="mx-3 mt-3 d-flex justify-content-between">
                        <h5 class="card-title">${result.symbol.toUpperCase()}</h5>
                        <div class="form-check form-switch">
                            <input id="${result.id}" class="form-check-input" type="checkbox" role="switch" ${result.picked ? 'checked' : ''}>
                        </div>
                    </div>
                    <div class="card-body pt-0">
                        <p class="card-text">${result.name}</p>
                        <button class="btn btn-light">More Details</button>
                    </div>
                </div>`
            $('#body').html(`${searchResult}
            <p class="mt-3">press 'Home' button to show all the coins again</p>`);
            pickingCoins();
        }
    } else {
        $('.nav-link').removeClass('active');
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
$('.moreInfoBtn').on('click', function () {
    const moreInfoModal = new bootstrap.Modal('#moreInfoModal');
    const modalToggle = document.getElementById('moreInfoModal');
    const symbol = $(this.parentElement.parentElement).data('symbol');
    $('#moreInfoModalLabel').text(symbol.toUpperCase());
    modalBody(symbol);
    moreInfoModal.show(modalToggle);
})

const savedCoinsDetails = JSON.parse(localStorage.getItem('savedCoinsDetails')) || new Array();

function modalBody(symbol) {
    const coin = cryptoCoins.find(coin => coin.symbol === symbol);
    const url = `https://api.coingecko.com/api/v3/coins/${coin.id}`;
    let thisCoin = savedCoinsDetails.find(coinObj => coinObj.symbol === symbol);
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
                    // saving to the localStorage
                    localStorage.setItem('savedCoinsDetails', JSON.stringify(savedCoinsDetails));
                    $("#modalOverlay").fadeOut(300);
                    // injecting to the "More Details" modal
                    injectModalBody(symbol);
                }, 300);
            },
            success: (result) => {
                // saving coins "More Details" data inside an array
                savedCoinsDetails.push({
                    symbol: coin.symbol,
                    imgSrc: result.image.small, // image options: thumb , small , large
                    usd: result['market_data']['current_price'].usd,
                    eur: result['market_data']['current_price'].eur,
                    ils: result['market_data']['current_price'].ils,
                })
            }
        })
    } else {
        injectModalBody(symbol);
    }
}

function injectModalBody(symbol) {
    let thisCoin = savedCoinsDetails.find(coinObj => coinObj.symbol === symbol);
    $('.modal-body').html(`
        <p id="coinImage"><img src="${thisCoin.imgSrc}" alt="${thisCoin.symbol.toUpperCase()} coin image" /></p>
        <p id="coinPrices">
            <p>USD: ${thisCoin.usd ? thisCoin.usd : 'N/A'}$</p>
            <p>EUR: ${thisCoin.eur ? thisCoin.eur : 'N/A'}€</p>
            <p>ILS: ${thisCoin.ils ? thisCoin.ils : 'N/A'}₪</p>
        </p>
    `)
}

// clearing saved coins details from the localStorage every 2 minutes
setInterval(() => {
    localStorage.removeItem('savedCoinsDetails');
    savedCoinsDetails.splice(0);
}, 2 * 60 * 1000);

// calling change page function to each button in the nav bar
changePage('homeButton', homePage);
changePage('liveButton', liveReportsPage);
changePage('aboutButton', aboutPage);