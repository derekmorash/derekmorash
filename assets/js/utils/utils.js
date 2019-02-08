/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */
window.derek = window.derek || {};
derek.utils = {
  /**
   * debounce function
   * for stopping a function from running if it has already ran recently
   *
   * @param {function} func - function to be debounced
   * @param {int} wait - number of milliseconds to to wait
   * @param {bool} immediate - if function should be called first before waiting
   */
  debounce: function (func, wait, immediate) {
    wait = wait || 200;
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  },

  /**
   * Checks if an element exists
   * Returns true or false
   *
   * @param {object} el - Dom Element
   * @returns {bool} - Returns the resolved value
   */
  elementExists: function (el) {
    if (typeof (el) !== 'undefined' && el !== null) {
      return true;
    }
    return false;
  },

  /**
   * Sets a new browser cookie with a specified name, value, and expiry date
   * @param {Object} new_cookie
   * new_cookie object example:
   * {
   *   name: "my cookie",
   *	 value: true,
   *   expires: 365
   * }
   */
  setCookie: function (new_cookie) {
    var todays_date = new Date();
    todays_date.setTime(
      todays_date.getTime() + new_cookie.expires * 24 * 60 * 60 * 1000
    );
    var expires = "expires=" + todays_date.toUTCString();
    document.cookie =
      new_cookie.name + "=" + new_cookie.value + ";" + expires + ";path=/";
  },

  /**
   * Returns the value of a given cookie
   * - or false if cookie doesn't exist
   * @param {String} cookie_name
   * @returns {Boolean}
   */
  getCookie: function (cookie_name) {
    cookie_name += "=";
    var cookie_value = false;

    var decoded_cookie = decodeURIComponent(document.cookie);
    var cookie_start = decoded_cookie.indexOf(cookie_name);
    var cookie_end = decoded_cookie.indexOf(";", cookie_start + 1);
    // the cookie value might not end in a semicolon
    // - if it doesn't then just end the string at the end of the cookie string
    cookie_end = cookie_end > 1 ? cookie_end : decoded_cookie.length;

    // only get the cookie value if the cookie is found in the users cookies string
    if (cookie_start >= 0 && cookie_end <= decoded_cookie.length) {
      cookie_value = decoded_cookie.substring(
        cookie_start + cookie_name.length,
        cookie_end
      );
    }

    // return the value of the given cookie
    // - if the cookie value string is "true" or "false" then change cookie_value to bolean value
    if (cookie_value === "true") {
      cookie_value = true;
    } else if (cookie_value === "false") {
      cookie_value = false;
    }

    return cookie_value;
  },

  /*
   * Deletes the cookie with the name given as a param
   * Uses the setCookie method to set the cookie to be expired
   * @param {String} cookie_name
   */
  deleteCookie: function (cookie_name) {
    var cookie_to_delete = {
      name: cookie_name,
      value: "",
      expires: -365
    };

    setCookie(cookie_to_delete);
  }
};