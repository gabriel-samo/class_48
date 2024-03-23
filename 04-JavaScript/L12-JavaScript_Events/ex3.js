// Selecting the div element that was created with regular HTML to insert the form to.
const mainDiv = document.querySelector('#mainDiv');

// Injection the form HTML to the div element.
let formBody = `
    <form>
        <h1>Exercise 3</h1>
        <hr/><br/>
        <input type='number' id='carNumber' placeholder='Car number'> <br/> <br/>
        
        <input type='text'> <br/><br/>
        <input type='text'> <br/><br/>
        <input type='text'> <br/><br/>
        <input type='text'> <br/><br/>
        <input type='text'> <br/><br/>
        <input type='text'> <br/><br/>
        <input type='text'> <br/><br/>

        <input type='button' value='Submit' onclick='addCar()'>
        <input type='reset'> <br/>
    <br/><hr/>
    </form>
    <div id='tableDiv'></div>
`
// ^^ added a 'onclick' attributes becasue when you set innerHTML the addEventListener will only work once because the innerHTML gets reparesed and remove the addEventListener... ^^

mainDiv.innerHTML = formBody;

// An empty array to store all or our 'Car' obejcts.
const cars = [];

// Selecting the 'Submit' button.
const submitButton = document.querySelector('input[type="Submit"]');

// Constructor for 'Car' objects. 
function Car(carNumber) {
    this.carNumber = carNumber;
}

// A function declaration for table creation.
function createTable() {

    // Selecting the second div that was created with the HTML injection, display the table.
    const tableDiv = document.querySelector('#tableDiv')
    // Table header.
    let result = `    
    <table cellspacing=0>
        <tr>
            <td>Car number</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td><button onclick='clearTable()'>Clear All</button></td>
        </tr>`

    // Table body. this will iterate inside the array an will diplay all the objects.
    for (let index = 0; index < cars.length; index++) {
        result += `
        <tr class='tableRow${index}'>
            <td>${cars[index].carNumber}</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td>---"---</td>
            <td><button onclick='deleteCar(${index})'>Delete</button></td>
        </tr>
        `
    }
    // Table footer.
    result += `</table>`

    // Injection all the table HTML into the sercond div.
    tableDiv.innerHTML = result;
}

// A function declaration to add a new car obejct to the array and then to create the table. (the function extarcts the value from the Car Number input and then reset it)
function addCar() {
    let carNumber = document.querySelector('#carNumber');
    cars.push(new Car(carNumber.value));
    carNumber.value = '';
    createTable();
}

// **Bonus** A function declaration to clear the table and the array.
function clearTable() {
    document.querySelector('table').remove();
    cars.splice(0);
}

// **Bonus** A function declaratio to clear a single given row and clear the object related to it inside the array and then re-creates the table.
function deleteCar(rowNum) {
    cars.splice(rowNum, 1);
    createTable();
}


