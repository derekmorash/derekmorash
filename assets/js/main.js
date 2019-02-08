(function() {
  var docElement = document.documentElement;

  // check if 'Inter' has already been downloaded
  if (docElement.className.indexOf('inter-loaded') < 0 || !derek.utils.getCookie('inter-loaded')) {
    console.log('Load Inter');
    // create a new FontFaceObserver to watch for 'Inter' to download
    var fontInter = new FontFaceObserver('Inter');

    fontInter.load().then(function() {
      docElement.className += " inter-loaded";
      derek.utils.setCookie({
        name: 'inter-loaded',
        value: true,
        expires: 30
      });
    });
  }
})();