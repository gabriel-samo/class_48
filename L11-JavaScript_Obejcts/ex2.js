const taskList = [new Task('Name','Date')];

function Task(taskName, taskDate) {
  this.name = taskName;
  this.date = taskDate;
  this.state = false;

  this.tableHeader = function () {
    return `
      <table cellspacing='0' cellpadding='10' border='1' style='margin: 0 auto;'>
        <thead>
          <th>Name</th>
          <th>Date</th>
          <th>Done</th>
        </thead>
        <tr>
          <td><input type='text' placeholder='Enter task name'/ id='name'></td>
          <td><input type='date' id='date'/></td>
          <td><input type='checkbox' id='state'/></td>
          <td><th><button onclick='addTask();'>Add</button></th></td>
        </tr>
    `
  };

  this.tableBody = function () {
    return `
      <tr>
        <td>${this.name}</td>
        <td>${this.date}</td>
        <td><input type='checkbox'/></td>
      </tr>
    `
  };

  this.tableFooter = function () {
    return `
      </table>
    `
  };
}

function addTask() {
  const taskName = document.getElementById('name').value;
  const taskDate = document.getElementById('date').value;
  taskList.push(new Task(taskName, taskDate));
  createTable();
}

function createTable(taskList) {
  let newTable = taskList[0].tableHeader();
  for (let i = 0; i < taskList.length; i++){
    newTable += taskList[i].tableBody();
  }
  newTable += taskList[0].tableFooter();
}
