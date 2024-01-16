// URL for car data
const carDataURL = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q="
//URL for handicap car
const handicapCarURL = "https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q="

async function getCarData(carNumber) {
    let carData = new Promise(async (resolve, reject) => {
        try {
            const timeOut = setTimeout(() => {
                reject('Timed Out');
            }, 5000)
            let request = await fetch(carDataURL + carNumber);
            if (request.ok) {
                clearTimeout(timeOut);
                let data = await request.json();
                if(data.result.records[0]){
                    console.log(data.result.records[0]);
                } else {
                    console.log('***No Data Available***')
                }
                resolve(data);
            }
        } catch(error){
            reject('Error', error);
        }
    })
    let isHandicap = new Promise(async (resolve, reject) => {
        try{
            let data = await fetch(handicapCarURL+carNumber);
            data = await data.json();
            if(data.result.records.length > 0){
                console.log('Handicap car');
                resolve(data);
            } else {
                console.log('NOT Hansicap car')
            }
        } catch(error){
            console.log('Error', error);
            reject();
        }
    })
}

getCarData(6225433);
getCarData(2733650);