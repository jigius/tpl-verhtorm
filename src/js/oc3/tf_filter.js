/**
 * Refactored js-code to tf_filter module
 * jigius@gmail.com, 2022
 */
const isEqual = require('lodash.isequal');
const modifyURLQuery = require('../modifyURLQuery');

const tf_filter = function (setting = {}) {
    const that = this;
    const defaultOpts = {
        delay: 2, // Second
        dispatcher: function () { return true; },
        status: {
            price: 1,
            manufacturer: 1,
            filter: 1,
            availability: 1,
            collapse: 1
        }
    };
    this.opts = $.extend(defaultOpts, setting);
    const paramsEmptied = {
        tf_fp: null,
        tf_fs: null,
        tf_fm: null,
        tf_ff: null,
        tf_cs: null,
    };
    const params = function (prohibited) {
      prohibited ||= [];
      if (Object.prototype.toString.call(prohibited) !== '[object Array]') {
        throw new Error("argument `prohibited` is invalid");
      }
      const param = {};
      if (that.opts.status.price) {
        let price = '';
        const minPrice = $(that).find('[name="tf_fp[min]"]');
        const maxPrice = $(that).find('[name="tf_fp[max]"]');
        const vmin = minPrice.val().replace(/\D/g, '');
        const vmax = maxPrice.val().replace(/\D/g, '');
        if (minPrice.attr('min') !== vmin) { // When minimum price change
          price += vmin;
        }
        if (maxPrice.attr('max') !== vmax) { // When maximum price change
          price += 'p' + vmax;
        }
        if (price) {
          param.tf_fp = price;
        }
      }
      if (that.opts.status.availability) {
        const inStock = $(that).find('[name="tf_fs"]:checked').val();
        if (inStock !== undefined) {
          param.tf_fs = inStock;
        }
      }
      // Manufacturer
      if (that.opts.status.manufacturer) {
        const manufacturerIds = $(that).find('[name="tf_fm"]:checked').map(function () {
          return $(this).val();
        }).get().join('.');
        if (manufacturerIds) {
          param.tf_fm = manufacturerIds;
        }
      }
      // Filter
      if (that.opts.status.filter) {
        const filterIds = $(that).find('[name="tf_ff"]:checked').map(function () {
          return $(this).val();
        }).get().join('.');
        if (filterIds) {
          param.tf_ff = filterIds;
        }
      }
      // collapse states
      if (that.opts.status.collapse && $.inArray('collapse', prohibited) === -1) {
        const collapseIds = (function () {
          let ret;
          try {
            ret =
              $(that)
                .find(".panel.tf-filter-group")
                .map(function () {
                  let ret;
                  const collapsed = $(this).hasClass("collapsed");
                  if (collapsed ^ !!$(this).data('o-collapsed')) {
                    ret =
                      (function (el) {
                        const found = $(el).attr('id').toString().match(/\d+$/);
                        if (!found) {
                          throw new Error("environment is broken");
                        }
                        const id= parseInt(found[0]);
                        if (isNaN(id)) {
                          throw new Error("invalid value");
                        }
                        return (collapsed? -1: 1) * (id + 1);
                      }) (this);
                  }
                  return ret;
                })
                .get();
          } catch ($e) {
            ret = [];
          }
          return ret;
        }) ();
        if (collapseIds) {
          param.tf_cs = collapseIds.join('.');
        }
      }
      return $.extend(Object.assign({}, paramsEmptied), param);
    };
    const update = function (params) {
      // Reload page with filter parameter
      window.location.href =
        modifyURLQuery(
          window.location.href,
          $.extend(params, {page: null})
        );
    };
    this.rqUpdate = function () {
        if (!isEqual(this.initParams, params(['collapse']))) {
            if (typeof this.opts.dispatcher === 'function') {
                const promise = this.opts.dispatcher('updating');
                if (typeof promise === 'object' && typeof promise.then === 'function') {
                    promise.then(function () {
                        update(params());
                    });
                    return;
                } else if (!promise) {
                    /* an request is canceled */
                    return;
                }
            }
            update(params());
        }
    };
    this.rqReset = function () {
        update(paramsEmptied);
    };
    this.initParams = params(['collapse']);
    this.on('change', function () {
        if (!!that.timeoutId) {
            window.clearTimeout(that.timeoutId);
        }
        that.timeoutId = setTimeout(function () {
            that.rqUpdate();
        }, that.opts.delay * 1000);
    });
    this.on('reset', function () {
        if (!!that.timeoutId) {
            window.clearTimeout(that.timeoutId);
        }
        that.rqReset();
    });
};

module.exports = tf_filter;
