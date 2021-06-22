const { remove, complete } = require('../services/taskService');

document.querySelector('.fa-trash-alt').addEventListener('click', (evt) => {
    const target = evt.target;
    console.log(target);
    let txt;
    if (confirm("Сигурен ли си, че искаш да изтриеш задачата?")) {
        await remove(taskId, userId);
        txt = "Задачата е изтрита";
    } else {
        txt = "You pressed Cancel!";
    }
});

document.querySelector('.fa-check').addEventListener('click', (evt) => {
    const target = evt.target;
    console.log(target);
    let txt;
    if (confirm("Сигурен ли си, че искаш да завършиш задачата?")) {
        await complete(taskId, userId);
        txt = "Задачата е завършена";
        
    } else {
        txt = "You pressed Cancel!";
    }
});