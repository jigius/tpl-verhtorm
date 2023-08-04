(function (dep) {
  dep
    .resolved("$")
    .then(function ($) {
      $(".catalog-filter-btn .catalog-btn").click(function (ev) {
        ev.preventDefault();
        $(this).closest(".catalog-filter__block-mobile").toggleClass("collapsed");
      });
    });
}) (window.App.dependency);
