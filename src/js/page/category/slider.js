(function (dep) {
  dep
    .resolved("$", "wNumb", "noUiSlider")
    .then(function ($, wNumb, noUiSlider) {
      $(".panel-price-slider .slider")
        .each(function () {
          $(this).data("slider", this);
          const slider = this;
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
            let target;
            if (handle === 0) {
              target = "min";
            } else if (handle === 1) {
              target = "max";
            } else {
              throw new Error("environment is broken");
            }
            (function (target) {
              target
                .val(values[handle])
                .data('raw-value', values[handle].replace(/\D/g, ''));
            })($(slider).parent().find("input[name='tf_fp[" + target + "]']"))
            $(slider).change();
          })
        })
    });
}) (window.App.dependency);

window
  .App
  .dependency
  .resolved('$')
  .then(function ($) {
    (function () {
      $(".panel-price-input").on('change', function (ev) {
        ev.preventDefault();
        let values;
        if ($(this).attr('name') === 'tf_fp[min]') {
          values = [$(this).val(), null];
        } else if ($(this).attr('name') === 'tf_fp[max]') {
          values = [null, $(this).val()];
        } else {
          throw new Error("environment is broken");
        }
        $(this).closest(".panel-price-slider").find(".slider").first().data('slider').noUiSlider.set(values);
      });
    }) ();
  });
