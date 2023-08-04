/*const selectSingle = document.querySelector('.select');
const selectSingle_title = selectSingle.querySelector('.select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.select__label');
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}*/
(function (dep) {
  dep
    .resolved("$")
    .then(function ($) {
      $(".custom-control.select").on("click", ".select__title", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        $(this).parent().toggleClass("open");
      });
      $(document).on("click", ".custom-control.select.open .select__content", function (ev) {
        ev.stopPropagation();
        //ev.preventDefault();
      });
      $(document).on("click", function (ev) {
        $(".custom-control.select.open").toggleClass("open")
      })
    });
}) (window.App.dependency);
