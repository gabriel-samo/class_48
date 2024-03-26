const urlAll = 'https://restcountries.com/v3.1/all'
const urlCountry = 'https://restcountries.com/v3.1/name/'


$('.btn-success').on('click', () => {
    let searchVaule = $('#searchField');
    $.get({
        url: urlCountry + searchVaule.val(),
        success: (data) => {
            // console.log(data);
            statistics(data);
            searchVaule.val('');
        }
    })
})

$('.btn-danger').on('click', () => {
    $.get({
        url: urlAll,
        success: (data) => {
            // console.log(data);
            statistics(data);
        }
    })
})

function statistics(givenArray) {
    let resultObject = new Object();
    let regions = new Object();
    let coins = new Object();

    for (let counter = 0; counter < givenArray.length; counter++) {
        if (!resultObject.totalPopulation) {
            resultObject.totalPopulation = givenArray[counter].population;
        } else {
            resultObject.totalPopulation += givenArray[counter].population;
        }

        if (!resultObject[givenArray[counter].name.official]) {
            resultObject[givenArray[counter].name.official] = givenArray[counter].population
        } else {
            resultObject[givenArray[counter].name.official] += givenArray[counter].population
        }

        if (!regions[givenArray[counter].region]) {
            regions[givenArray[counter].region] = 1;
        } else {
            regions[givenArray[counter].region] += 1;
        }

        let currency = Object.keys(givenArray[counter].currencies ? givenArray[counter].currencies : {});
        if (!coins[currency[0]]) {
            coins[currency[0]] = 1
        } else {
            coins[currency[0]] += 1;
        }
    }

    let result = $('#result');
    const average = Math.round(resultObject.totalPopulation / givenArray.length);
    result.html(`Total countries result: ${givenArray.length}</br>
        Total Countries Population: ${resultObject.totalPopulation}</br>
        Average Population: ${average}</br></br></br>`);

    let countryTbody = ''
    for (result in resultObject) {
        countryTbody += `
        <tr>
            <td>${result}</td>
            <td>${resultObject[result]}</td>
        </tr>`
    }
    $('#countryResult').html(`
        <thead class="table-light">
            <tr>
                <th>Country Name</th>
                <th>Number of citizens</th>
            </tr>
        </thead>
        <tbody>${countryTbody}</tbody>`)

    // console.log(regions);
    let regionTbody = '';
    for (let region in regions) {
        regionTbody += `
        <tr>
            <td>${region}</td>
            <td>${regions[region]}</td>
        </tr>
        `
    }
    $('#regionResult').html(`
        <thead class="table-light">
        <tr>
            <th>Region</th>
            <th>Number of countries</th>
        </tr>
        </thead>
        <tbody>${regionTbody}</tbody>`);

    let coinsTbody = '';
    for (let coin in coins) {
        coinsTbody += `
        <tr>
            <td>${coin}</td>
            <td>${coins[coin]}</td>
        </tr>
        `
    }

    $('#coinsResult').html(`
        <thead class="table-light">
        <tr>
            <th>Coin</th>
            <th>Number of countries using that coin</th>
        </tr>
        </thead>
        <tbody>${coinsTbody}</tbody>`)
}
