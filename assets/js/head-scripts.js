(function() {
  var docElement = document.documentElement;
  docElement.classList.replace('no-js', 'js');

  if (sessionStorage['ibm-plex-mono-400-normal-loaded']) {
    document.documentElement.classList.add("ibm-plex-mono-loaded");
  }
  
  if (sessionStorage['ibm-plex-sans-400-normal-loaded']) {
    document.documentElement.classList.add("ibm-plex-sans-loaded");
  } 

  if (sessionStorage['ibm-plex-sans-400-normal-loaded']) {
    document.documentElement.classList.add("ibm-plex-sans-loaded");
  } 
})();