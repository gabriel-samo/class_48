const url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=ebcc8e6d-16df-43f9-97d6-a36f1912c9ed&q=';
const tbody = document.querySelector('tbody');
const button = document.querySelector('button');

async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    data = data.result.records;

    // console.log(data[0].candidates;

    for (let item of data) {
        tbody.innerHTML += `
        <tr>
            <td>${item.city}</td>
            <td>${item.sumcandidates}</td>
            <td dir="ltr">${item.candidates.replaceAll(',','\n')}</td>
            <td>${document.dispatchEvent(new CustomEvent('event:mehura'),item.sumcandidates)}</td>
            <td>${document.dispatchEvent(new CustomEvent('event:moreThan5'),item.sumcandidates)}</td>
        </tr>
    `
    }
}

button.addEventListener('click', ()=>{
    getData(url);
})
