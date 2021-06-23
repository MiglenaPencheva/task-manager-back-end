// document.querySelector('.fa-trash-alt').addEventListener('click', confirmMsg)

// document.querySelector('.fa-check').addEventListener('click', (evt) => {
//     if (confirm("Сигурен ли си, че искаш да завършиш задачата?")) {
//         alert("Задачата е завършена");
//     }
// });

const deleteBtn = document.querySelector(".delete-msg").addEventListener('click', showDeleteMsg);

function showDeleteMsg(e) {
    console.log('inside');
    let deleteMsg = confirm("Сигурен ли си, че искаш да изтриеш задачата?");
    if (!deleteMsg) {
        e.preventDefault();
    } else {
        alert("Задачата е изтрита");
    }
};

module.exports = {
    showDeleteMsg
}