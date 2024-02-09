function getAppartments(city) {
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=7c8255d0-49ef-49db-8904-4cf917586031&q=${city}`
    $.get({
        url,
        beforeSend: function () { $('body').addClass("loading"); },
        complete: function () { $('body').removeClass("loading"); },
        success: (data) => {
            let response = data.result.records;
            // console.log(response);

            for (let city of response) {
                $('tbody').append(`
                    <tr>
                        <td>${city.Neighborhood}</td>
                        <td>${city.PriceForMeter}</td>
                        <td>${city.ProjectStatus}</td>
                        <td>${city.Subscribers}</td>
                    </tr>
                `)
            }
        }
    })
}

const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=7c8255d0-49ef-49db-8904-4cf917586031`
$.get(url, (data) => {
    const result = data.result.records;
    let cities = new Object();
    for (let item of result) {
        if (!cities[item.LamasName]) {
            cities[item.LamasName] = null;
        }
    }
    for (let item in cities) {
        $('#cityName').append($('<option>', {
            value: item,
            text: item,
        }));
    }
})

$('#getAppartments').on('click', () => {
    $('tbody').text('');
    getAppartments($('#cityName').val());
})