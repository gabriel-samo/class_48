const assainments = [];

const addTask = () => {
    createObject();

    let main = `
    <table>
        <tr>
            <td>#</td>
            <td>Name of the assainment</td>
            <td>Date to complete</td>
            <td>Is completed</td>
        </tr>
        <tbody>
            <tr>
                <td></td>
                <td>
                    <input type="text" id="name">
                </td>
                <td>
                    <input type="date" id="date">
                </td>
                <td>
                    <input type="checkbox" id="state">
                </td>
                <td>
                    <button id="add" onclick="addTask();">Add</button>
                </td>
            </tr>
    `;

    for(let i=0;i<assainments.length;i++){
        main += `
        <tr id="task${i+1}">
            <td>
                ${i+1}
            </td>
            <td>
                ${assainments[i].name}
            </td>
            <td>
                ${assainments[i].date}
            </td>
            <td>
                <input type="checkbox" id="state" ${assainments[i].state}>
            </td>
            <td>
                <button onclick="deleteTask('task${i+1}',${i});">Delete</button>
            </td>
        </tr>
    `;
    }

    main += `
        </tbody>
    </table>`

    document.getElementById('main').innerHTML = main;
}

const createObject = () => {
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;

    assainments.push({
        name: name,
        date:  date,
        state: false
    })
}

const deleteTask = (task, id) => {
    let taskToRemove = document.getElementById(task);
    taskToRemove.remove();
    assainments.splice(id , 1);
}
