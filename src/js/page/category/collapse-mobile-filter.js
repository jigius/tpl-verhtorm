(function (dep) {
  dep
    .resolved("$")
    .then(function ($) {
      $(".show-all").click(function () {
        $(this).closest("li").toggleClass("several-items-are-showed");
      });
      $(".panel-heading").click(function () {
        $(this).closest("li").toggleClass("collapsed");
      });
    });
}) (window.App.dependency);
