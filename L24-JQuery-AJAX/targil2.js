$.ajax({
    url: 'https://restcountries.com/v3.1/all/?fields=region,population',
    method: 'GET',
    success: (data) => {

        let regionObj = {};

        for(let index = 0; index < data.length; index++){
            if(regionObj[data[index].region] === undefined){
                regionObj[data[index].region] = data[index].population;
            } else {
                regionObj[data[index].region] += data[index].population;
            }
        }

        // console.log(regionObj);

        // for(let [key, value] of Object.entries(regionObj)){
        //     $('tbody').append(`
        //         <tr>
        //             <td>${key}</td>
        //             <td>${value}</td>
        //         </tr>
        //     `)
        // }

        for(let item in regionObj){
            $('tbody').append(`
                <tr>
                    <td>${item}</td>
                    <td>${regionObj[item]}</td>
                </tr>
            `)
        }
    }
})

