import $ from 'jquery';

export default function (event) {
  const modal = $('#modal');
  const button = $(event.relatedTarget);
  const link = button.prev();
  const title = link.children()[0].innerText;
  const description = link.children()[1].innerText;
  modal.find('.modal-title').text(title);
  modal.find('.modal-body').text(description);
}
