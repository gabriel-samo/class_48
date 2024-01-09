class Task {
    constructor(taskDetails, taskDate, taskTime) {
        this.taskDetails = taskDetails;
        this.taskDate = taskDate;
        this.taskTime = taskTime;
    }

    static myTasks = JSON.parse(localStorage.getItem('myTasks')) || []; 

    static addTask() {
        const newTask = new Task(
            document.getElementById('taskDetails').value,
            document.getElementById('taskDate').value,
            document.getElementById('taskTime').value);

        this.myTasks.push(newTask);
        this.createNoteBoard();
        document.getElementById('taskForm').reset();

        // adding fade in only to the last task added.
        const allTaskNotes = document.querySelectorAll('.taskNote');
        allTaskNotes[allTaskNotes.length-1].classList.add('fadeIn');
        setTimeout(() => {
            document.querySelector('.fadeIn').classList.remove('fadeIn');
        },1000);
    }

    static createNoteBoard() {
        Task.validateTask();
        let noteBoard = document.getElementById('noteBoard')

        let taskNote = '';
        for (let index = 0; index < this.myTasks.length; index++) {
            taskNote += `
            <div class="taskNote">
                <button type="button" class="deleteNote${index} btn-close" aria-label="Close" onclick="Task.deleteNote('${index}')"></button>
                <div class="taskNoteText">${this.myTasks[index].taskDetails}</div>
                <div class="date">${this.formatDate(this.myTasks[index].taskDate)}</div>
                <div class="time">${this.myTasks[index].taskTime}</div>
            </div>
            `
        }
        noteBoard.innerHTML = taskNote;
        localStorage.setItem('myTasks', JSON.stringify(this.myTasks));
    }

    static validateTask() {
        for(let index = 0; index < this.myTasks.length; index++){
            let taskTime = this.myTasks[index].taskTime;
            let taskDate = this.myTasks[index].taskDate;
            let taskDateAndTime = new Date(taskDate);

            taskDateAndTime.setHours(
                `${taskTime.split(':')[0]}`,
                `${taskTime.split(':')[1]}`);

            let currentTime = new Date();
            
            if(taskDateAndTime < currentTime){
                this.myTasks.splice(index, 1);
                index--;
            }
        }
        localStorage.setItem('myTasks', JSON.stringify(this.myTasks));
    }

    static deleteNote(index) {
        let deleteButton = document.querySelector(`.deleteNote${index}`);
        deleteButton.parentElement.style.opacity = '1';
        let fadeOut = setInterval(() => {
            if (deleteButton.parentElement.style.opacity > '0') {
                deleteButton.parentElement.style.opacity -= '0.1';
            } else {
                deleteButton.parentElement.remove();
                this.myTasks.splice(index, 1);
                this.createNoteBoard();
                clearInterval(fadeOut);
            };
        }, 50);
        localStorage.setItem('myTasks', JSON.stringify(this.myTasks));
    }

    static formatDate(date) {
        let oldDate = date.split('-');
        let newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`;
        return newDate;
    }
}


Task.createNoteBoard();