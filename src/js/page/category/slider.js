(function (dep) {
  dep
    .resolved("$", "wNumb", "noUiSlider")
    .then(function ($, wNumb, noUiSlider) {
      const slider = document.getElementById('slider');
      noUiSlider.create(
        slider,
        {
          start: [105, 16920],
          connect: true,
          range: {
            'min': 105,
            'max': 16920
          },
          //step: 500,
          format: wNumb({
            decimals: 0,
            thousand: ' ',
            suffix: ''
          }),
        }
      );
      slider.noUiSlider.on('update', function (values, handle) {
        let id;
        if (handle === 0) {
          id = 'range_start';
        } else if (handle === 1) {
          id = 'range_finish';
        }
        if (id) {
          $("#" + id)
            .val(values[handle])
            .data('raw-value', values[handle].replace(/\D/g, ''));
          $(slider).change();
        }
      })
    });
}) (window.App.dependency);

window
  .App
  .dependency
  .resolved('$')
  .then(function ($) {
    (function () {
      $("#filter").on('change', '.panel-price-input', function (ev) {
        ev.preventDefault();
        let values;
        if ($(this).attr('id') === 'range_start') {
          values = [$(this).val(), null];
        } else if ($(this).attr('id') === 'range_finish') {
          values = [null, $(this).val()];
        }
        if (values) {
          slider.noUiSlider.set(values);
        }
      });
    }) ();
  });
