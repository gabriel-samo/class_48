const url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=ebcc8e6d-16df-43f9-97d6-a36f1912c9ed&q=';
const one = document.querySelector('#oneCand');
const many = document.querySelector('#manyCand');
const reg = document.querySelector('#regCand');
const button = document.querySelector('button');

async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    data = data.result.records;

    // console.log(data[0]);

    for (let item of data) {
        if(item.sumcandidates <= 1){
            document.dispatchEvent(new CustomEvent('event:one', {detail: item}));
        } else if(item.sumcandidates >= 5){
            document.dispatchEvent(new CustomEvent('event:many', {detail: item}));
        } else {
            document.dispatchEvent(new CustomEvent('event:regular', {detail: item}));
        }
    }
}

button.addEventListener('click', ()=>{
    getData(url);
})
