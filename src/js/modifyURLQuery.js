 /**
  * Manipulates with query params into passes URL
  * Extracted from js-core code module `tr_filter`
  *
  * jigius@gmail.com, 2022
  *
  * @queryParams url
  * @queryParams queryParams
  * @returns {string}
 */
const modifyURLQuery = function(url, queryParams, allowed, prohibited) {
    allowed = allowed || [];
    prohibited = prohibited || [];
    let value = {};
    const query = String(url).split('?');
    if (query[1]) {
        const part = query[1].split('&');
        for (let i = 0; i < part.length; i++) {
            const data = part[i].split('=');
            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }
    }
    if (typeof allowed !== "object" ||  Object.prototype.toString.call(allowed) !== "[object Array]") {
      throw new Error("`allowed` arg is invalid");
    }
    if (typeof prohibited !== "object" ||  Object.prototype.toString.call(prohibited) !== "[object Array]") {
      throw new Error("`prohibited` arg is invalid");
    }
    value = Object.assign(value, queryParams);
    // Generate query parameter string
    let query_param = '';
    for (let i in value) {
        if (
          (allowed.length === 0 || allowed.indexOf(i) !== -1) &&
          (prohibited.length === 0 || prohibited.indexOf(i) === -1) &&
          value[i]
        ) {
            if (i === 'route') { // Skip route value to encode
                query_param += '&' + i + '=' + value[i];
            } else {
              let val = value[i].toString();
              if (decodeURIComponent(val).length === val.length) {
                /* encode is needed */
                val = encodeURIComponent(val);
              }
              query_param += '&' + i + '=' + val;
            }
        }
    }
    // Return url with modified parameter
    if (query_param) {
        return query[0] + '?' + query_param.substring(1);
    } else {
        return query[0];
    }
};

module.exports = modifyURLQuery;
