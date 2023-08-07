const Dependency = require("./dependency");

const app = {
  dependency: new Dependency()
};

window.jQuery = window.$ = require("jquery");
$(function() {
  app.dependency.register('$', $)
});

require("fancybox")($);
import "fancybox/dist/css/jquery.fancybox.css";

/**
 * Slider of pictures
 */
require("slick-carousel/slick/slick.min");
import "slick-carousel/slick/slick.css";
import "../styles/legacy/slick-carousel/slick-theme.css";

/**
 * Menu for mobile devices
 */
require("slicknav/dist/jquery.slicknav");
import "slicknav/dist/slicknav.css"

/**
 * Lightweight ES6 Promise polyfill for the browser and node. Adheres closely to the spec.
 * It is a perfect polyfill IE or any other browser that does not support native promises.
 */
//import 'promise-polyfill/src/polyfill';

app.dependency.register('EventQueue', require("./event_queue"));
app.dependency.register('Inputmask', require("inputmask"));
window.modifyURLQuery = require('./modifyURLQuery');

/* Used into catalog.page */
app.dependency.register('wNumb', require("wnumb"));

import "nouislider/dist/nouislider.css";
app.dependency.register('noUiSlider', require("nouislider/dist/nouislider"));

$.fn.tf_filter = require("./oc3/tf_filter");

app.dependency.register('template', require("./micro-templating.escaped"));
/**
 * Modal window
 */
$.fn.leanModal = require("lean-modal");

/**
 * OC3 cart
 */
window.cart = require("./oc3/cart");

/**
 * Project's fonts
 */
import "./fonts.js";

/**
 * Project's styles
 */
import "./styles.js";

/**
 * Exposes only one global variables for the accessing to miscellaneous functions
 */
window.App = app;

// Select

const selectSingle = document.querySelector('.select');
const selectSingle_title = selectSingle.querySelector('.select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.select__label');
selectSingle_title.addEventListener('click', () => {
if ('active' === selectSingle.getAttribute('data-state')) {
selectSingle.setAttribute('data-state', '');
} else {
selectSingle.setAttribute('data-state', 'active');
}
});
for (let i = 0; i < selectSingle_labels.length; i++) {
selectSingle_labels[i].addEventListener('click', (evt) => {
selectSingle_title.textContent = evt.target.textContent;
selectSingle.setAttribute('data-state', '');
});
}