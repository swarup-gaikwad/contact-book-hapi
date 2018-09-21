$(document).ready(function () {
    $('.deleteContact').on('click', () => {
        $.ajax({
            url: '/contact/delete/' + event.target.dataset.id,
            type: 'DELETE',
            success: function (result) {
                console.log(result);
                location.reload();
            }
        });
    });

    $('#updateContactForm').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: '/contact/update/' + $('#updateContactForm').data().id,
            type: 'PUT',
            data: getFormData($(this)),
            success: function (result) {
                console.log(result);
                location.reload();
            }
        });
    });
});

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}