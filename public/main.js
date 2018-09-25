$(document).ready(() => {
  $('.deleteContact').on('click', (event) => {
    $.ajax({
      url: '/contact/delete/' + event.target.dataset.id,
      type: 'DELETE'
    }).done((result) => {
      location.reload();
    }).fail((jqXHR, status, textStatus) => {
      toastr.error(textStatus);
    });
  });

  $('#updateContactForm').on('submit', (event) => {
    let form = $('#updateContactForm');
    event.preventDefault();
    $.ajax({
      url: '/contact/update/' + form.data().id,
      type: 'PUT',
      data: getFormData(form)
    }).done((result) => {
      window.location.href = '/contacts';
    }).fail((jqXHR, status, textStatus) => {
      toastr.error(textStatus);
    });
  });

  $('.edit-mobile').on('click', (event) => {
    let targetId = event.currentTarget.dataset.id;
    $('.' + targetId + '-display-mobile').toggleClass('d-none');
    $('.' + targetId + '-edit-mobile').toggleClass('d-none');
  });

  $('.save-mobile').on('click', (event) => {
    let targetId = event.currentTarget.dataset.id;
    let mobile = $('#' + targetId + 'MobileInput').val();
    $.ajax({
      url: '/contact/partialUpdate/' + targetId,
      type: 'PATCH',
      data: {
        mobile: mobile
      }
    }).done((result) => {
      toastr.success('Mobile number updated successfully');
      $('.' + targetId + '-display-mobile').toggleClass('d-none');
      $('.' + targetId + '-edit-mobile').toggleClass('d-none');
      $('#' + targetId + 'Mobile').val(mobile);
    }).fail((jqXHR, status, textStatus) => {
      toastr.error(jqXHR.responseJSON.message);
    });
  });
});

function getFormData ($form) {
  var unindexedArray = $form.serializeArray();
  var indexedArray = {};
  $.map(unindexedArray, (n, i) => {
    indexedArray[n['name']] = n['value'];
  });
  return indexedArray;
}
