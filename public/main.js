$(document).ready(function () {
  $('.deleteContact').on('click', (event) => {
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

function getFormData ($form) {
  var unindexedArray = $form.serializeArray();
  var indexedArray = {};
  $.map(unindexedArray, function (n, i) {
    indexedArray[n['name']] = n['value'];
  });
  return indexedArray;
}
