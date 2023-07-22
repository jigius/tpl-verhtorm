/**
 * Js-код, который относится к шаблону фильтра каталога товаров.
 * Используется для вспомогательной цели - продемонстрировать работу шаблона в "активном" режиме
 *
 * !!! НЕ БУДЕТ включен в окончательную сборку проекта
 */

(function (dep) {
  dep.resolved('$', 'Inputmask')
    .then(function ($, Inputmask) {
      /**
       * Attaches inputmask to all elements which have a data-input attribute
       */
      $("[data-inputmask]").each(function () {
        Inputmask.default().mask(this);
      });
    });
}) (window.App.dependency);


$(function () {
  $('.nav_main').slicknav({label: ''});
});

$(function () {
  $(".nav_main li.itm-11").addClass("active");
});
