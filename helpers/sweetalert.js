const Swal = require('sweetalert2');

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'fa-trash-alt',
        cancelButton: 'fa-times'
    },
    buttonsStyling: false
})

swalWithBootstrapButtons.fire({
    title: 'Сигурен ли си, че искаш да изтриеш задачата?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Изтриване на задачата',
    cancelButtonText: 'Отказ',
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
            'Задачата е изтрита!'
        )
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire(
            'Задачата е активна'
        )
    }
});