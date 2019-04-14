(function() {
  var docElement = document.documentElement;

  // check if 'Noto Serif' has already been downloaded
  if (docElement.className.indexOf('noto-serif-loaded') < 0 || !derek.utils.getCookie('noto-serif-loaded')) {
    console.log('Load Noto Serif');
    // create a new FontFaceObserver to watch for 'Noto Serif' to download
    var fontNotoSerif = new FontFaceObserver('Noto Serif');

    fontNotoSerif.load().then(function() {
      docElement.className += " noto-serif-loaded";
      derek.utils.setCookie({
        name: 'noto-serif-loaded',
        value: true,
        expires: 30
      });
    });
  }

  // check if 'Nunito' has already been downloaded
  if (docElement.className.indexOf('nunito-loaded') < 0 || !derek.utils.getCookie('nunito-loaded')) {
    console.log('Load Nunito');
    // create a new FontFaceObserver to watch for 'Nunito' to download
    var fontNunito = new FontFaceObserver('Nunito');

    fontNunito.load().then(function() {
      docElement.className += " nunito-loaded";
      derek.utils.setCookie({
        name: 'nunito-loaded',
        value: true,
        expires: 30
      });
    });
  }
})();