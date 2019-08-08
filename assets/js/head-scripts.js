(function() {
  var docElement = document.documentElement;
  docElement.classList.replace('no-js', 'js');

  if (sessionStorage['noto-serif-400-normal-loaded']) {
    document.documentElement.classList.add("noto-serif-loaded");
  }
  
  if (sessionStorage['nunito-600-normal-loaded']) {
    document.documentElement.classList.add("nunito-loaded");
  } 
})();