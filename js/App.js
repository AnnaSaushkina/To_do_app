// import taskManager from "./store.js";

// -------------------------- КОНСТРУКТОР МЕТОДОВ
function Task(userText, id) {
    this.userText = userText;
    this.id = id;
    this.done = false;

    this.lastOperation = null;
};

let taskManager = {
    tasks: [],

    addTask(id, userText) {
        let newTask = new Task(userText, id);
        this.tasks.push(newTask)
   
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
       } else this.tasks.splice(foundIndex, 1)
    },
    toggleDone(id) {
        this.tasks.forEach(task => {
            if (id == task.id) {
               task.lastOperation = "toggle"
               task.done = !task.done    
        
            } 
         })   
    },
    editTask(id, updateText) {
        this.tasks.forEach(task => {
            if (id == task.id) {
                task.lastOperation = "edit"
                task.userText = updateText
    
           } 
        })
    },
}





// 1. Базовый функционал (DOM + ООП)
// слушатели кнопок
let deleteBtn = document.querySelector(".delete")
let addBtn = document.querySelector(".add")
let editBtn = document.querySelector(".edit")


// ----------------------ИНПУТ для текста
let unput = document.querySelector('.input')
const input = document.querySelector('.input')
input.addEventListener('change', (e) => {
    e.preventDefault();
})


// ----------------------создание содержания задачи с чекбоксами
function createEl(task, ul) {
    const li = document.createElement("li")
    li.append(task.userText, " ")

    // ----------создаем чекбокс
    let checkboxInput = document.createElement('input')
    checkboxInput.type = "checkbox"
    checkboxInput.checked = task.done
    li.prepend(checkboxInput)

    
    checkboxInput.addEventListener('change', () => {
        task.done = checkboxInput.checked;
    })

    ul.appendChild(li)
    return checkboxInput
}



// ----------------------отрисовка ЗАДАЧИ В ЛИСТ
function render() {

    // Создание листа
    const tasksContainer = document.querySelector(".task-list")
    tasksContainer.classList.add('list-group')
    const ul = document.createElement("ul")
    tasksContainer.replaceChildren(ul)

    const checkboxesList = []

    // Отрисовка каждый задачи с чекбоксом в лист
    taskManager.tasks.forEach(task => {
        const checkbox = createEl(task, ul)
        checkboxesList.push(checkbox)
        console.log(checkboxesList)
    })

    return checkboxesList
}



// ----------------ЯДРО ВЫЗОВА
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



//ДЕЛАЕМ------------навешивание такого же индекса на чекбокс
 // -------------------- кликаем по зеленой кнопке
 addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // -------------------- рандомизируем индекс
    function randomizeId() {
        return Math.floor(Math.random() * 100)
    };
    
    let uniqueId = randomizeId()
    let checkboxesArray = render();

    function uniteId() {
        console.log(uniqueId)
     }
     uniteId(uniqueId)
    //  checkboxesArray.forEach(checkbox => { 
    //     checkbox.id = randomizeId()
    //     console.log(checkbox.id)
    //  })

     userInput("add", randomizeId(), input.value);
    


    
     
    taskManager.tasks.forEach(task => { 
        console.log(task.userText + task.id)
     })
});








// ---------------ДОБАВИТЬ элемент ЗАДАЧИ
function addTaskItem() {

        // -----------НАЖАТИЕ ОКА
        function setOK(setId) {

            // okCheckboxes.forEach(okayBtn => {
            //     okayBtn.setAttribute('id', setId)
            //     okayBtn.addEventListener('click', (e) => {
            //             e.preventDefault(); 
            //     })  
                
            //     console.log(okayBtn + "лист с инпутами")
            // })

            // ----------сравниваем чекбок с таском и вызываем тогл
            // taskManager.tasks.forEach(taskArray => { 
            //     taskArray.id = setId
            //     userInput("toggle", setId);
            // })   
        }  
        // ----- включаем добавление чекбокса с рандомным числом
        setOK(randomizeId())


}
// addTaskItem()













