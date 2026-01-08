const addTaskButton = document.getElementById('add-task-button');
const taskNameInput = document.getElementById('task-name-input');
const todoColumn = document.getElementById('todo');
const messageContainer = document.getElementById('message-container');

addTaskButton.addEventListener('click', addTask);

let taskIdCounter = 0;

const addTask = () => {
    const taskName = taskNameInput.value.trim();
    if (taskName === "") return;
    const taskCard = document.createElement('div');
    taskCard.id = 'task-' + taskIdCounter++;
    taskCard.classList.add('task-card');
    taskCard.setAttribute('draggable', true);
    taskCard.addEventListener('dragstart', dragStart);
    taskCard.addEventListener('dragend', dragEnd);
    const taskNamePara = document.createElement('p');
    taskNamePara.textContent = taskName;
    const taskDatePara = document.createElement('p');
    taskDatePara.classList.add('task-date');
    taskDatePara.textContent = new Date().toLocaleDateString();

    taskCard.appendChild(taskNamePara);
    taskCard.appendChild(taskDatePara);
    todoColumn.appendChild(taskCard);

    taskNameInput.value = '';
}

const dragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('dragging');
    }, 0);
};

const dragEnd = (event) => event.target.classList.remove('dragging');

const allowDrop = (event) => event.preventDefault();

const drop = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(taskId);
    const dropZone = event.target.closest('.column');

    if (dropZone && dropZone.id !== draggableElement.parentNode.id) {
        dropZone.appendChild(draggableElement);
        if (dropZone.id === 'completed') {
            draggableElement.classList.add('completed');
            showMessage('Task Completed Successfully');
        } else draggableElement.classList.remove('completed');
    }
}

const showMessage = (msg) => {
    messageContainer.textContent = msg;
    messageContainer.style.display = 'block';
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000);
}
