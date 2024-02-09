function getBusStation(city) {
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=e873e6a2-66c1-494f-a677-f5e77348edb0&q=${city}`
    $.ajax({
        url: url,
        beforeSend: function () { $('body').addClass("loading"); },
        complete: function () { $('body').removeClass("loading"); },
        method: 'GET',
        dataType: "json",
        success: (data) => {
            let response = data.result.records;
            var marker;
            for (let item of response) {
                console.log(item)
                if (item.CityName === city)
                    marker = L.marker([item.Lat, item.Long]).addTo(map);
            }
        }
    })
}

$('#getBus').on('click', () => {
    getBusStation($('#cityName').val());
    $('#cityName').val('');
})

var map = L.map('map').setView([32.7996878,35.0579758], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
