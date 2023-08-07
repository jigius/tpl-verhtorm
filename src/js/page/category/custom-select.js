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
