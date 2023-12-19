var allCars = JSON.parse(localStorage.getItem('allCars')) || [];
//for injection the site......
var carSite = document.getElementById("carSite");
var carEndPoint = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=";

var mySite = `
    <form id="carForm" action="javascript:addCar()">
        <h1>Car Info</h1><hr/>
        <input type="text" id="carNumber" placeholder="Car Number" required/>
        <br/><br/>
        <input type="text" placeholder="Manufacturer" id="manufacturer" disabled/><br/><br/>
        <input type="text" placeholder="Model" id="model" disabled/><br/><br/>
        <input type="text" placeholder="Color" id="color" disabled/><br/><br/>
        <input type="text" placeholder="Gasoline" id="gasoline" disabled/><br/><br/>
        <input type="text" placeholder="Year" id="year" disabled/><br/><br/>
        <input type="text" placeholder="Next Test" id="nextTest" disabled/><br/><br/>
        <input type="number" placeholder="Km" id="km" required/><br/><br/>
        <input type="text" placeholder="URL Image" id="imgUrl" required/>
        <input type="button" value="Add Image" id="addImg"/>
        <div id="carImages"></div>
        <br/><br/>
        <input type="submit" value="Add Car" id="addCar"/>
        <input type="reset" value="Reset Form"/>
    </form>
    <hr/>
    <button id="clearTable">Clear Table</button></br></br>
    <div id="carTable"></div>
`;

//show site
carSite.innerHTML = mySite;

const addCar = () => {
    //check if car not exists and validate
    if (validateCar(document.getElementById("carNumber").value)) {
        alert("car already exists");
        return;
    }
    carInfo.km = document.getElementById("km").value;
    carInfo.img = document.getElementById('imgUrl').value;
    addCarData(carInfo);
    allCars.push(carInfo);
    createTable();
    resetForm();
    localStorage.setItem('allCars', JSON.stringify(allCars));
}

const validateCar = (carNumber) => {
    //check if object is already exists    
    for (var index = 0; index < allCars.length; index++) {
        if (allCars[index].mispar_rechev == carNumber) {
            return true;
        }
    }
    return false;
}

document.getElementById("carNumber").addEventListener("focusout", async () => {
    //wait until we will get an answer for the api server
    carInfo = await getCarAPI(document.getElementById("carNumber").value);
    updateFields(carInfo);
})

const updateFields = (myInfo) => {
    document.getElementById("manufacturer").value = myInfo.tozeret_nm;
    document.getElementById("model").value = myInfo.kinuy_mishari;
    document.getElementById("color").value = myInfo.tzeva_rechev;
    document.getElementById("year").value = myInfo.shnat_yitzur;
    document.getElementById("gasoline").value = myInfo.sug_delek_nm;
    document.getElementById("nextTest").value = niceDate(myInfo.tokef_dt);
}

//tell the computer that we will using asynchronicity function
const getCarAPI = async (carNumber) => {
    const response = await fetch(carEndPoint + carNumber);
    const res = await response.json();
    return res.result.records[0];
}

//create table :)
const createTable = () => {
    var tableHeader = `
        <table border="1" cellspacing="0">
            <tr>
                <th>Car Number</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Gasoline</th>
                <th>Test</th>
                <th>Km</th>
                <th>Car Image</th>
            </tr>
    `
    var tableBody = () => {
        var allrows = "";
        for (var index = 0; index < allCars.length; index++) {
            allrows += addCarData(allCars[index]);
        }
        return allrows;
    }

    var tableFooter = `</table>`
    document.getElementById("carTable").innerHTML = tableHeader + tableBody() + tableFooter;
}

//get single car row in table
const addCarData = (carObject) => {
    return `
        <tr>
            <td>${carObject.mispar_rechev}</td>
            <td>${carObject.tozeret_nm}</td>
            <td>${carObject.kinuy_mishari}</td>
            <td>${carObject.shnat_yitzur}</td>
            <td>${carObject.tzeva_rechev}</td>
            <td>${carObject.sug_delek_nm}</td>
            <td>${niceDate(carObject.tokef_dt)}</td>
            <td>${carObject.km}</td>
            <td><img src="${carObject.img}" alt="Car Image"></td>
        </tr>
    `;
}

const niceDate = (uglyDate) => {
    //new date will be now an array, with size of - sign (+1)
    var newDate = uglyDate.split('-');
    return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
}

// clear table function.
const clearTable = () => {
    allCars = [];
    localStorage.removeItem('allCars');
    createTable();
}

// adding click event for clearing the table.
document.getElementById('clearTable').addEventListener('click', clearTable);

// Creating the table from localStorage.
createTable();

// adding img preview inside the form, only one img can be present.
document.getElementById('addImg').addEventListener('click', () => {
    carImg = document.createElement('img');
    carImg.src = document.getElementById('imgUrl').value;
    const divImg = document.getElementById('carImages');
    if (!divImg.hasChildNodes()) {
        divImg.append(carImg);
    } else {
        divImg.removeChild(divImg.firstChild);
        divImg.append(carImg);
    }
})

// function declaration for form reset and clear the image inside the div
function resetForm(){
    document.getElementById("carForm").reset();
    const divImg = document.getElementById('carImages');
    divImg.removeChild(divImg.firstChild);
}

// adding an event that clears the from once clicking the 'Reset From' button.
document.querySelector('input[type="reset"]').addEventListener('click',resetForm)