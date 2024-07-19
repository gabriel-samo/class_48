const formBody = document.getElementById('formBody');
const allEvents = [];

formBody.innerHTML = `
    <form id="myForm" action="javascript:addEvent()">
        <h1>Event Adder</h1>
        <hr/>
        <input type="text" id="eventName" placeholder="Event Name" required>
        <br/><br/> 
        <input type="number" id="maxPrice" placeholder="Maxium Price to Give" required>
        <br/><br/>
        <input type="number" id="minPrice" placeholder="Minimum Price to Give" required>
        <br/><br/>
        <select id="eventType" required>
            <option></option>
            <option>Wedding</option>
            <option>Bar/Bat Mitzva</option>
            <option>Brit</option>
            <option>Anniversary</option>
            <option>Birth Day</option>
        </select>
        <br/><br/>
        <input type="text" id="imgUrl" placeholder="URL of image" required>
        <br/><br/>
        <input type="date" id="eventDate" required>
        <br/><br/>
        <input type="submit">
        <input type="reset">
        <br/><br/><hr/>
    </form>
    <div id="tableMain"><div>
    `

class NewEvent{
    constructor(eventName,maxPrice,minPrice,eventType,imgUrl,eventDate){
        this.eventName = eventName;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.eventType = eventType;
        this.imgUrl = imgUrl;
        this.eventDate = eventDate;
    }
}

function addEvent(){
    const myForm = document.getElementById('myForm');
    const eventInfo = new NewEvent(
        document.getElementById('eventName').value,
        document.getElementById('maxPrice').value,
        document.getElementById('minPrice').value,
        document.getElementById('eventType').value,
        document.getElementById('imgUrl').value,
        document.getElementById('eventDate').value,
    )

    if(checkPrice(document.getElementById('maxPrice').value,document.getElementById('minPrice').value)){
        return;
    }

    if(checkDate(document.getElementById('eventDate').value)){
        return;
    }
    
    allEvents.push(eventInfo);
    createTable(allEvents);
    myForm.reset();
}

function createTable() {
    const tableMain = document.getElementById('tableMain');
    let tableHeader = `
            <table cellspacing=0 border=1 cellpadding=10>
                <thead>
                    <th>Event name</th>
                    <th>Maximum to give</th>
                    <th>Minimum to give</th>
                    <th>Event type</th>
                    <th>Image</th>
                    <th>Date</th>
                    <th><button id="deleteTable" onclick="deleteTable()">Delete All</button></th>
                </thead>
        `
    let tableBody='';
    for (let index = 0; index < allEvents.length; index++) {
        tableBody += `
            <tr>
                <td>${allEvents[index].eventName}</td>
                <td>${allEvents[index].maxPrice}</td>
                <td>${allEvents[index].minPrice}</td>
                <td>${allEvents[index].eventType}</td>
                <td><img id="img${index}" src="${allEvents[index].imgUrl}" height="300"></td>
                <td>${dateFormat(allEvents[index].eventDate)}</td>
                <td><button onclick="deleteRow(${index})">Delete</button></td>
            </tr>
        `
    }
    let tableFooter = `</table>`

    tableMain.innerHTML = tableHeader + tableBody + tableFooter;
}

function dateFormat(date){
    oldDate = date.split("-");
    newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`;
    return newDate;
}

function deleteTable(){
    allEvents.splice(0);
    createTable();
}

function deleteRow(id){
    allEvents.splice(id,1);
    createTable();
}

function checkDate(date){
    const eventDate = new Date(date);
    const todayDate = new Date();

    if(eventDate < todayDate){
        alert('You can not enter a date in the past. Please enter a vaild date.');
        return true;
    }
    return false;
}

function checkPrice(maxPrice, minPrice) {
    if(minPrice > maxPrice){
        alert('The minimum price can NOT be greater then the max price.Please enter the corret prices');
        return true;
    }
    return false;
}
