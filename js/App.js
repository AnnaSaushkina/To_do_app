// import taskManager from "./store.js";

function Task(userText, id) {
    this.userText = userText;
    this.id = id;
    this.done = false;

    this.lastOperation = null;
};

let taskManager = {
    tasks: [],
    inputHistory: [],
    lastRender: '',

    addTask(id, userText) {
        let newTask = new Task(userText, id);
        this.tasks.push(newTask)
        this.inputHistory.push(newTask)

        this.tasks.forEach(task => {
            if (id == task.id) {
                task.lastOperation = "add"
            } 
        })  
    },
    deleteTask(id) {
       let foundIndex = this.tasks.findIndex(task => task.id === id);
       if (foundIndex === -1) {
            console.log('Задача номер', id, 'не найдена')
       } else {
        this.tasks.splice(foundIndex, 1)
        // this.inputHistory.splice(deletedTask, 1)
       }
    },
    toggleDone(id) {
        this.tasks.forEach(task => {
            if (id == task.id) {
               task.lastOperation = "toggle"
               let toggled = task.done = !task.done    
               this.inputHistory.push = toggled
            } 
         })   
    },
    editTask(id, updateText) {
        this.tasks.forEach(task => {
            if (id == task.id) {
                task.lastOperation = "edit"
                let edited = task.userText = updateText
                this.inputHistory.push = edited
           } 
        })
    },

    getRenderedOutput() {
        let output = "\n---Текущий список задач: ---\n";
        this.tasks.forEach(task => {
          output += ` ${task.userText} ${task.done ? '✓' : '×'}\n`;
        });
        return output;
      }
}

function render() {
    const currentOutput = taskManager.getRenderedOutput();
    if (currentOutput !== taskManager.lastRender) {

        console.log(currentOutput);
        taskManager.lastRender = currentOutput;
      }
 }

 function userInput(command, id, text) {
    switch (command) {
        case 'add':
            taskManager.addTask(Number(id), text);
            break;
        case 'delete':
            taskManager.deleteTask(Number(id));
            break;
        case 'toggle':
            taskManager.toggleDone(Number(id));
            break;
        case 'edit':
            taskManager.editTask(Number(id), text);
            break;
    }
    render();
}


// Имитация ввода
userInput("add", 1, "любой текст");
userInput("add", 2, "купить молоко");
userInput("add", 5, "покакать");
userInput("add", 9, "девятая задча");
// userInput("add", 9, "задача 2");
// userInput("add", 4, "задача 3");

// userInput("toggle", 2);
// userInput("toggle", 2);
// userInput("toggle", 2);


// userInput("delete", 1);

// userInput("add", 1, "дrrrr");

// userInput("delete", 1);
// userInput("delete", 1);

console.log(taskManager.tasks)