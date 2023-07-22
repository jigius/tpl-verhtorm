/**
 * Has been extracted from oc3 common.js the code for the interaction with the cart
 *
 * jigius@gmail.com, 2023
 */
const cart = {
  'add': function(product_id, quantity) {
    const result = $.Deferred();
    $.ajax(
      '/index.php?route=checkout/cart/add',
      {
        type: 'post',
        data: 'product_id=' + product_id + '&quantity=' + (typeof (quantity) != 'undefined' ? quantity : 1),
        dataType: 'json'
      }
    )
      .then(function (data) {
        if (!data || typeof data !== 'object') {
          throw new Error("response is invalid");
        }
        if (!(data.success || data.error)) {
          throw new Error("response is corrupted");
        }
        result.resolve(data);
      })
      .fail(function (err) {
        result.reject(err);
      });
    return result.promise();
  },
  'remove': function(key) {
    const result = $.Deferred();
    $.ajax(
      '/index.php?route=checkout/cart/remove',
      {
        type: 'post',
        data: 'key=' + key,
        dataType: 'json'
      }
    )
      .then(function (data) {
        if (!data || typeof data !== 'object') {
          throw new Error("response is invalid");
        }
        if (!data.success || !data.total) {
          throw new Error("response is corrupted");
        }
        result.resolve(data);
      })
      .fail(function (err) {
        result.reject(err);
      });
    return result.promise();
  },
  'clear': function(key) {
    const result = $.Deferred();
    $.ajax(
      '/index.php?route=extension/local/checkout/cart/clear',
      {
        type: 'post',
        dataType: 'json'
      }
    )
      .then(function (data) {
        if (!data || typeof data !== 'object') {
          throw new Error("response is invalid");
        }
        if (!data.success) {
          throw new Error("response is corrupted");
        }
        result.resolve(data);
      })
      .fail(function (err) {
        result.reject(err);
      });
    return result.promise();
  },
  'updateAll': function(data) {
    const result = $.Deferred();
    $.ajax(
      '/index.php?route=checkout/cart/edit',
      {
        type: 'post',
        data: {
          quantity: data
        }
      }
    )
      .then(function (data) {
        result.resolve(data);
      })
      .fail(function (err) {
        result.reject(err);
      });
    return result.promise();
  },
  'update': function(key, quantity) {
      throw new Error("environment is broken");
  }
};

module.exports = cart;
