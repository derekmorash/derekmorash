(function() {
  var docElement = document.documentElement;
  docElement.className = docElement.className.replace('no-js', 'js');

  function getCookieValue(cookie_name) {
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
    // - if the cookie value string is "true" or "false" then change cookie_value to boolean value
    if (cookie_value === "true") {
      cookie_value = true;
    } else if (cookie_value === "false") {
      cookie_value = false;
    }

    return cookie_value;
  }

  if (getCookieValue('inter-loaded')) {
    docElement.className += " inter-loaded";
  }
})();