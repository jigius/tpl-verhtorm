window
  .App
  .dependency
  .resolved('$')
  .then(function ($) {
    (function () {
      if (window.innerWidth < 767) { // Collapsed all panel in small device
        // FIXME!!!!!
        // $('#tf-filter .collapse.in').collapse("hide");
      }
      $('#filter2').tf_filter({
        delay: true,
        dispatcher: function (type) {
          return true;
        }
      });
      $('#filter2').on('change', function (e) {
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
      (function () {
        /**
         * Reset all control stuff
         */
        const update = function () {
          const resetAll = $('#filter2 .tf-filter-reset[data-tf-reset="all"]');
          const minPrice = $('#filter2 input[name="tf_fp[min]"]');
          const maxPrice = $('#filter2 input[name="tf_fp[max]"]');
          if (
            $('#filter2').find('.check-input[name]:checked').length > 0 ||
            minPrice.data('raw-value') !== minPrice.attr('min') ||
            maxPrice.data('raw-value') !== maxPrice.attr('max')
          ) {
            resetAll.removeClass('hide');
          } else {
            resetAll.addClass('hide');
          }
        };
        update();
        $('#filter2')
          .on('change', '.check-input[name], .panel-price-input', function () {
            update();
          })
          .on('click', '.catalog-clear-all', function (ev) {
            ev.preventDefault();
            $('#filter').trigger('reset');
          });
      })();
    }) ();
  });
