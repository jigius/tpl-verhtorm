(function (dep) {
  dep
    .resolved('$')
    .then(function ($) {
      (function () {
        if (window.innerWidth < 767) { // Collapsed all panel in small device
          // FIXME!!!!!
          // $('#tf-filter .collapse.in').collapse("hide");
        }
        $(".catalog-filter")
          .each(function () {
            $(this)
              .tf_filter({
                delay: true,
                dispatcher: function () {
                  return true;
                }
              });
            $(this)
              .on('change', "input[type=checkbox]", function (e) {
                if ($(e.target).hasClass("check-input__all-variants")) {
                  /* unchecked all use variants */
                  if ($(e.target).prop("checked")) {
                    $(e.target)
                      .closest('.tf-filter-group')
                      .find('input[type="checkbox"]:not(".check-input__all-variants")')
                      .prop('checked', false);
                  }
                } else if ($(e.target).hasClass("check-input")) {
                  const group = $(e.target).closest('.tf-filter-group');
                  const selected = group.find('.check-input[name]:checked').length > 0;
                  group
                    .find('input.check-input__all-variants')
                    .prop("checked", !selected);
                  (function (target, selected, klass) {
                    if (selected) {
                      target.addClass(klass)
                    } else {
                      target.removeClass(klass)
                    }
                  })($(e.target).closest(".panel"), selected, "panel__in-use");
                }
              });
          });
        (function () {
          /**
           * Reset all control stuff
           */
          $(".tf-filter-reset")
            .on('click', function (ev) {
              ev.preventDefault();
              $(this).trigger('reset');
            });
        })();
      })();
    });
})(window.App.dependency);
